export const padArray = (
  input: Array<any>,
  length: number,
  defaultValue: any = {},
): Array<any> => {
  const array: Array<any> = [].concat(input as []);

  if (array.length < length) {
    for (let i = 0; i < length - array.length; i += 1) {
      array.push(defaultValue);
    }
  }

  return array;
};
