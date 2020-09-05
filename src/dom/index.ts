import { MyObject } from '../interfaces';

export const nodeInParent = (
  elem: MyObject,
  value: string,
  type: string = 'class',
): Boolean => {
  if (
    typeof elem.classList === 'undefined' ||
    elem.classList.contains('content') ||
    elem.tagName === 'BODY'
  ) {
    return false;
  }

  switch (type) {
    case 'class':
      if (
        typeof elem.classList === 'undefined' ||
        false === elem.classList.contains(value)
      ) {
        if (!elem.parentNode) return false;
        return nodeInParent(elem.parentNode, value, type);
      }
      break;

    case 'id':
      if (value !== elem.id) {
        return nodeInParent(elem.parentNode, value, type);
      }
      break;
  }

  return true;
};

export default {
  nodeInParent,
};
