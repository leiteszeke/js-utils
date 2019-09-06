import { MyObject } from '../interfaces';

export const nodeInParent = (
  elem: MyObject,
  value: string,
  type: string = 'class'
): Boolean => {
  if (
    typeof elem.classList === 'undefined' ||
    elem.classList.contains('content') ||
    elem.tagName === 'BODY'
  ) {
    return false;
  }

  const dataAttr = type.substring(5);

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

    case /data(-\w+)/.test(type):
      if (value !== elem.dataset[dataAttr]) {
        return nodeInParent(elem.parentNode, value, type);
      }
      break;
  }

  return true;
};

export default {
  nodeInParent,
};
