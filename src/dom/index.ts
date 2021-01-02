import { Generic } from '../types';

export const nodeInParent = (
  elem: Generic,
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
        elem.classList.contains(value) === false
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

    default:
      return false;
  }

  return true;
};

export default {
  nodeInParent,
};
