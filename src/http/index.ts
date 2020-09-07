import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const getSession = (): { token: string } | null => {
  const session = localStorage.getItem(process.env.SESSION_KEY || '');
  if (!session) return null;
  return JSON.parse(session) as { token: string };
};

const getToken = (): string | null => {
  const session: { token: string } | null = getSession();

  if (session === null) {
    return null;
  }

  return session?.token;
};

const objectToQueryString = (obj: Generic<string | number>): string =>
  Object.keys(obj)
    .map((key) => `${key}=${obj[key]}`)
    .join('&');

async function request<T>(
  initialUrl: string,
  params?: Generic,
  method: RequestMethod = RequestMethod.GET,
  config: RequestConfig = {},
  callbacks?: RequestCallbacks,
): Promise<Resource<T>> {
  const prefix = typeof config.prefix !== 'undefined' ? config.prefix : true;
  const randomNumber = Math.floor(Math.random() * 100);
  const headers: HeadersInit = new Headers();
  const options: AxiosRequestConfig = { method };

  let url = `${prefix ? process.env.API_URL || '' : ''}${initialUrl}`;

  headers.set('Content-Type', 'application/json');

  if (!config.public) {
    const token = config.token || getToken();
    headers.set('Authorization', `Bearer ${token}`);
  }

  if (params) {
    if (method === RequestMethod.GET) {
      url += `?${objectToQueryString(params)}`;
    } else {
      options.data = JSON.stringify(params);
    }
  }

  options.headers = headers;

  let response: AxiosResponse;
  const debug = false && !!process.env.IS_DEBUG;

  if (debug) {
    console.debug(`Debugging Request ${randomNumber}`, url, options);
  }

  let statusCode;

  try {
    response = await axios({
      url,
      ...options,
    });
    const errorStatus: Array<number> = [400, 401, 404, 500];

    if (errorStatus.indexOf(response.status) >= 0) {
      statusCode = response.status;
      const errorResponse = response.data;

      callbacks?.onUnauthorized?.(errorResponse);

      throw {
        data: {},
        error: true,
        message: 'unknown_error',
        statusCode: response.status,
      };
    }

    const result = response.data;

    if (debug) {
      console.debug(`Debugging Response ${randomNumber}`, result);
    }

    return Promise.resolve(result);
  } catch (e) {
    if (debug) {
      console.debug(`Debugging Response Error ${randomNumber}`, e);
    }

    return Promise.reject({ message: e.message, statusCode });
  }
}

async function get<T>(
  url: string,
  params?: Generic,
  options?: RequestConfig,
): Promise<Resource<T>> {
  const response = await request<T>(url, params, RequestMethod.GET, options);

  try {
    return handleSuccess(response);
  } catch (e) {
    return handleError<T>(e);
  }
}

async function post<T>(
  url: string,
  params?: Generic,
  options?: RequestConfig,
): Promise<Resource<T>> {
  const response = await request<T>(url, params, RequestMethod.POST, options);

  try {
    return handleSuccess(response);
  } catch (e) {
    return handleError<T>(e);
  }
}

async function put<T>(
  url: string,
  params?: Generic,
  options?: RequestConfig,
): Promise<Resource<T>> {
  const response = await request<T>(url, params, RequestMethod.PUT, options);

  try {
    return handleSuccess(response);
  } catch (e) {
    return handleError<T>(e);
  }
}

async function _delete<T>(
  url: string,
  params?: Generic,
  options?: RequestConfig,
): Promise<Resource<T>> {
  const response = await request<T>(url, params, RequestMethod.DELETE, options);

  try {
    return handleSuccess(response);
  } catch (e) {
    return handleError<T>(e);
  }
}

function handleSuccess<T>(res: RequestResponse<T>): Resource<T> {
  if (res.error) {
    return handleError(res);
  }

  return res as Resource<T>;
}

function handleError<T>(err: RequestResponse<T>): Resource<T> {
  if (err?.message?.includes('Network request failed')) {
    throw {
      error: true,
      data: {} as T,
      message: 'request_failed',
      statusCode: err.statusCode,
    };
  }

  return {
    error: true,
    data: err.data,
    message: err.message,
    statusCode: err.statusCode,
  };
}

export type Generic<T = any> = {
  [key: string]: T;
};

export type RequestConfig = {
  public?: boolean;
  prefix?: boolean | string;
  token?: string;
};

export enum RequestMethod {
  POST = 'POST',
  PUT = 'PUT',
  GET = 'GET',
  DELETE = 'DELETE',
}

export type RequestResponse<T> = {
  error: boolean;
  data: T;
  message: string;
  statusCode?: number;
};

export type Resource<T> = {
  data: T;
  error: boolean;
  message: string;
  statusCode?: number;
};

export type RequestCallbacks = {
  onUnauthorized?: (response: Generic) => void;
};

export const client = {
  get,
  post,
  put,
  delete: _delete,
};

export const basicClient = client;
export default client;
