export const padArray = (
  input: Array<any>,
  length: number,
  defaultValue: any = {}
): Array<any> => {
  const array: Array<any> = [].concat(input as []);

  if (array.length < length) {
    const rest: number = length - array.length;
    for (let i = 0; i < rest; i += 1) {
      array.push(defaultValue);
    }
  }

  return array;
};

export default {
  padArray,
};
