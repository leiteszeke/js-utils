import {
  MiddleCaseToPascalCase,
  MiddleCaseToSnakeCase,
  PascalCaseToMiddleCase,
  PascalCaseToSnakeCase,
  SnakeCaseToMiddleCase,
  SnakeCaseToPascalCase,
  Capitalize,
  CapitalizeEach,
} from '../index';

describe('strings module', () => {
  const strings = [
    { middle: 'hello-world', snake: 'hello_world', pascal: 'HelloWorld' },
    { middle: 'foo-bar', snake: 'foo_bar', pascal: 'FooBar' },
    { middle: 'my-string', snake: 'my_string', pascal: 'MyString' },
    { middle: 'lorem-ipsum', snake: 'lorem_ipsum', pascal: 'LoremIpsum' },
  ];

  describe('test MiddleCase input', () => {
    it('should return a pascal case string', () => {
      strings.map(string => {
        expect(MiddleCaseToPascalCase(string.middle)).toEqual(string.pascal);
        expect(MiddleCaseToPascalCase(string.middle)).not.toEqual(string.snake);
        expect(MiddleCaseToPascalCase(string.middle)).not.toEqual(
          string.middle,
        );
      });
    });

    it('should return a snake case string', () => {
      strings.map(string => {
        expect(MiddleCaseToSnakeCase(string.middle)).toEqual(string.snake);
        expect(MiddleCaseToSnakeCase(string.middle)).not.toEqual(string.pascal);
        expect(MiddleCaseToSnakeCase(string.middle)).not.toEqual(string.middle);
      });
    });
  });

  describe('test SnakeCase input', () => {
    it('should return a pascal case string', () => {
      strings.map(string => {
        expect(SnakeCaseToPascalCase(string.snake)).toEqual(string.pascal);
        expect(SnakeCaseToPascalCase(string.snake)).not.toEqual(string.middle);
        expect(SnakeCaseToPascalCase(string.snake)).not.toEqual(string.snake);
      });
    });

    it('should return a middle case string', () => {
      strings.map(string => {
        expect(SnakeCaseToMiddleCase(string.snake)).toEqual(string.middle);
        expect(SnakeCaseToMiddleCase(string.snake)).not.toEqual(string.pascal);
        expect(SnakeCaseToMiddleCase(string.snake)).not.toEqual(string.snake);
      });
    });
  });

  describe('test PascalCase input', () => {
    it('should return a snake case string', () => {
      strings.map(string => {
        expect(PascalCaseToSnakeCase(string.pascal)).toEqual(string.snake);
        expect(PascalCaseToSnakeCase(string.pascal)).not.toEqual(string.middle);
        expect(PascalCaseToSnakeCase(string.pascal)).not.toEqual(string.pascal);
      });
    });

    it('should return a middle case string', () => {
      strings.map(string => {
        expect(PascalCaseToMiddleCase(string.pascal)).toEqual(string.middle);
        expect(PascalCaseToMiddleCase(string.pascal)).not.toEqual(
          string.pascal,
        );
        expect(PascalCaseToMiddleCase(string.pascal)).not.toEqual(string.snake);
      });
    });
  });

  describe('test Capitalize', () => {
    it('should return first word capitalized', () => {
      expect(Capitalize('hello')).toEqual('Hello');
      expect(Capitalize('hi')).toEqual('Hi');
      expect(Capitalize('ciao')).toEqual('Ciao');
      expect(Capitalize('hola')).toEqual('Hola');
      expect(Capitalize('lorem ipsum')).toEqual('Lorem ipsum');
      expect(Capitalize('hello world')).not.toEqual('Hello World');
    });

    it('should return each word capitalized', () => {
      expect(CapitalizeEach('hello')).toEqual('Hello');
      expect(CapitalizeEach('hi')).toEqual('Hi');
      expect(CapitalizeEach('ciao')).toEqual('Ciao');
      expect(CapitalizeEach('hola')).toEqual('Hola');
      expect(CapitalizeEach('lorem ipsum')).toEqual('Lorem Ipsum');
      expect(CapitalizeEach('hello world')).toEqual('Hello World');
      expect(CapitalizeEach('hello world')).not.toEqual('hello world');
      expect(CapitalizeEach('hello world')).not.toEqual('Hello world');
    });
  });
});
