// Interfaces
import { MyObject } from '../intefaces';

export function queryFromObject(data: object): string {
  const result: string[] = [];

  Object.entries(data).map(([key, value]) => {
    result.push(`${key}=${value}`);
    return true;
  });

  return result.join('&');
}

export function objectFromQuery(input: string): Object {
  const query: string = input.replace('?', '');
  const params: string[] = query.split('&');
  const object: MyObject = {};

  params.forEach((value) => {
    const splitted:string[] = value.split('=');
    object[splitted[0]] = splitted[1] === '1' || splitted[1] === '0'
      ? !!parseInt(splitted[1], 10)
      : splitted[1];
  });

  return object;
}

function isDeepEqual(objA:MyObject, objB: MyObject): boolean {
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

export function extend(...args: any): Object {
  const extended: MyObject = {};
  let deep: boolean = false;
  let i: number = 0;
  const { length } = args;

  if (Object.prototype.toString.call(args[0]) === '[object Boolean]') {
    deep = args[0];
    i += 1;
  }

  const merge = (obj: MyObject) => {
    for (const prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
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

export function isEqual(objA: MyObject, objB: MyObject): boolean {
  return isDeepEqual(objA, objB) && isDeepEqual(objB, objA);
}
