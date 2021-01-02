import { Generic } from '../types';

export function queryFromObject(data: Object): string {
  const result: string[] = [];

  Object.entries(data).map(([key, value]) => {
    result.push(`${key}=${value}`);
    return true;
  });

  return result.join('&');
}

// TODO: Parametrize a 0/1 to boolean o numeric to number.
export function objectFromQuery(input: string): Object {
  const query: string = input.replace('?', '');
  const params: string[] = query.split('&');
  const object: Generic = {};

  params.forEach((value: string) => {
    const [key, val]: string[] = value.split('=');
    object[key] = val;
  });

  return object;
}

function isDeepEqual(objA: Generic, objB: Generic): boolean {
  let response = true;

  Object.entries(objA).map(([key, value]) => {
    if (typeof objB[key] === 'undefined') {
      response = false;
    }

    if (typeof objA[key] === 'object') {
      if (isDeepEqual(value, objB[key]) === false) {
        response = false;
      }
    } else if (objB[key] !== value) {
      response = false;
    }

    return true;
  });

  return response;
}

// TODO: Merge items in arrays
export function extend(...args: any): Object {
  const extended: Generic = {};
  let deep: boolean = false;
  let i: number = 0;
  const { length } = args;

  if (Object.prototype.toString.call(args[0]) === '[object Boolean]') {
    const [value] = args;
    deep = value;
    i += 1;
  }

  const merge = (obj: Generic) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (
          deep &&
          Object.prototype.toString.call(obj[prop]) === '[object Object]'
        ) {
          extended[prop] = extend(true, extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  for (; i < length; i += 1) {
    const obj = args[i];
    merge(obj);
  }

  return extended;
}

export function isEqual(objA: Generic, objB: Generic): boolean {
  return isDeepEqual(objA, objB) && isDeepEqual(objB, objA);
}

export function hasPath(
  object: Generic,
  path: String,
  getValue: boolean = false,
): boolean | null | any {
  const value = path
    .split('.')
    .reduce((item, innerPath) => (item || {})[innerPath], object);

  if (typeof value !== 'undefined') {
    if (getValue) {
      return value;
    }

    return true;
  }

  if (getValue) return null;
  return false;
}

export default {
  queryFromObject,
  objectFromQuery,
  isEqual,
  extend,
  hasPath,
};
