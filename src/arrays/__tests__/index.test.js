import { padArray } from '../index';

describe('arrays module', () => {
  describe('test padArray', () => {
    describe('fill an array if is necessary', () => {
      it('should return and array filled with defaultValue', () => {
        const defaultData = { value: 1 };
        const expectedResult = [
          defaultData,
          defaultData,
          defaultData,
          defaultData,
          defaultData,
        ];

        expect(padArray([], 5, defaultData)).toEqual(expectedResult);
        expect(padArray([], 5, defaultData)).toHaveLength(5);
      });

      it('should return and array prefilled and filled with defaultValue', () => {
        const initialData = { foo: 'bar' };
        const defaultData = { value: 1 };
        const expectedResult = [
          initialData,
          initialData,
          defaultData,
          defaultData,
        ];

        expect(padArray([initialData, initialData], 4, defaultData)).toEqual(
          expectedResult
        );
        expect(
          padArray([initialData, initialData], 4, defaultData)
        ).toHaveLength(4);
      });

      it('should return the same input', () => {
        const defaultData = { value: 1 };
        const input = [defaultData, defaultData, defaultData, defaultData];

        expect(padArray(input, 2, defaultData)).toEqual(input);
        expect(padArray(input, 2, defaultData)).toHaveLength(4);
      });
    });
  });
});
