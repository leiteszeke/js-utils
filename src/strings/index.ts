export const Capitalize = (input: string): string =>
  input.charAt(0).toUpperCase() + input.substring(1);

export const MiddleCaseToPascalCase = (input: string): string =>
  input
    .split('-')
    .map((word) => Capitalize(word))
    .join('');

export const MiddleCaseToSnakeCase = (input: string): string =>
  input.replace(/-/gi, '_');

export const CapitalizeEach = (input: string): string =>
  input
    .split(' ')
    .map((word) => Capitalize(word))
    .join(' ');

export const PascalCaseToSnakeCase = (input: string): string => {
  const upperLetters = input.split(/[a-z]/).filter((letter) => letter !== '');
  const lowerLetters = input.split(/[A-Z]/).filter((letter) => letter !== '');

  lowerLetters.forEach((letter, index) => {
    upperLetters[index] = upperLetters[index].toLowerCase() + letter;
  });

  return upperLetters.join('_');
};

export const PascalCaseToMiddleCase = (input: string): string => {
  const upperLetters = input.split(/[a-z]/).filter((letter) => letter !== '');
  const lowerLetters = input.split(/[A-Z]/).filter((letter) => letter !== '');

  lowerLetters.forEach((letter, index) => {
    upperLetters[index] = upperLetters[index].toLowerCase() + letter;
  });

  return upperLetters.join('-');
};

export const SnakeCaseToPascalCase = (input: string): string =>
  input
    .split('_')
    .map((word) => Capitalize(word))
    .join('');

export const SnakeCaseToMiddleCase = (input: string): string =>
  input.replace(/_/gi, '-');

export default {
  MiddleCaseToPascalCase,
  MiddleCaseToSnakeCase,
  PascalCaseToMiddleCase,
  PascalCaseToSnakeCase,
  SnakeCaseToMiddleCase,
  SnakeCaseToPascalCase,
  Capitalize,
  CapitalizeEach,
};
