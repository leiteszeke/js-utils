import {
  queryFromObject,
  objectFromQuery,
  isEqual,
  extend,
  hasPath,
} from '../index';

describe('objects module', () => {
  describe('test queryFromObject', () => {
    describe('generate a query string from a object', () => {
      it('should return and string joined by &', () => {
        const data = {
          foo: 1,
          bar: 2,
        };

        expect(queryFromObject(data)).toEqual('foo=1&bar=2');
        expect(queryFromObject(data)).not.toBe(data);
        expect(queryFromObject(data)).not.toBe('?foo=1&bar=2');
        expect(queryFromObject(data)).not.toBe('bar=2&foo=1');
      });
    });
  });

  describe('test objectFromQuery', () => {
    describe('generate an object from a query string given', () => {
      it('should return an object with given key values', () => {
        const queryString1 = 'foo=1&bar=2';
        const queryString2 = 'data=blabla&value=23';

        expect(objectFromQuery(queryString1)).toEqual({
          foo: '1',
          bar: '2',
        });
        expect(objectFromQuery(queryString2)).toEqual({
          data: 'blabla',
          value: '23',
        });
        expect(objectFromQuery(queryString1)).not.toBe({});
        expect(objectFromQuery(queryString2)).not.toBe('');
      });

      it('should return an empty object', () => {
        const queryString1 = '';
        const queryString2 = '';

        expect(objectFromQuery(queryString1)).toEqual({});
        expect(objectFromQuery(queryString2)).toEqual({});
        expect(objectFromQuery(queryString1)).not.toBe('');
        expect(objectFromQuery(queryString2)).not.toBe('');
      });
    });
  });

  describe('test isEqual', () => {
    describe('check if obj1 is equal to obj2', () => {
      it('should return that obj1 is equal to obj2', () => {
        const obj1 = {
          name: 'user',
          data: { email: 'obj@email.com', phone: 123455, favourites: [1, 2] },
        };
        const obj2 = {
          data: { email: 'obj@email.com', phone: 123455, favourites: [1, 2] },
          name: 'user',
        };

        expect(isEqual(obj1, obj2)).toBe(true);
        expect(isEqual(obj2, obj1)).toBe(true);
        expect(isEqual(obj2, obj1)).not.toBe(false);
      });

      it('should return that obj1 is not equal to obj2', () => {
        const obj1 = {
          name: 'user',
          data: { email: 'obj@email.com', phone: 123455, favourites: [1, 2] },
        };
        const obj2 = {
          name: 'pedro',
          data: { email: 'obj@email.com', phone: 123455, favourites: [1, 2] },
        };

        expect(isEqual(obj1, obj2)).toBe(false);
        expect(isEqual(obj2, obj1)).toBe(false);
        expect(isEqual(obj2, obj1)).not.toBe(true);
      });
    });
  });

  describe('test extend', () => {
    describe('extend and deep object', () => {
      it('should return the extended object', () => {
        const baseObject = {
          name: 'John',
          lastname: 'Doe',
          addresses: [
            {
              id: 1,
              address: 'Calle Falsa 123',
              notifications: {
                tracking: true,
                shipping: false,
              },
            },
          ],
          favourites: {},
        };

        const extendedData = {
          lastname: 'Does',
          friends: [{ id: 1, name: 'Pedrito' }, { id: 2, name: 'Pablito' }],
        };

        const finishData = { ...baseObject };
        finishData.lastname = 'Does';
        finishData.friends = [
          { id: 1, name: 'Pedrito' },
          { id: 2, name: 'Pablito' },
        ];

        expect(extend(baseObject, extendedData)).toEqual(finishData);
      });
    });
  });

  describe('test hasPath', () => {
    it('should return true for every case', () => {
      const object = {
        foo: {
          bar: {
            value: 1,
          },
        },
      };

      const object2 = {
        item: {
          value: {
            numeric: {
              string: null,
            },
          },
        },
      };

      expect(hasPath(object, 'foo.bar.value')).toEqual(true);
      expect(hasPath(object, 'foo.bar')).toEqual(true);
      expect(hasPath(object, 'foo')).toEqual(true);
      expect(hasPath(object2, 'item.value.numeric.string')).toEqual(true);
      expect(hasPath(object2, 'item.value.numeric')).toEqual(true);
      expect(hasPath(object2, 'item.value')).toEqual(true);
      expect(hasPath(object2, 'item')).toEqual(true);
    });

    it('should return false for every case', () => {
      const object = {
        foo: {
          bar: {
            value: 1,
          },
        },
      };

      const object2 = {
        item: {
          value: {
            numeric: {
              string: null,
            },
          },
        },
      };

      expect(hasPath(object, 'foo.bar.values')).toEqual(false);
      expect(hasPath(object, 'foo.barda')).toEqual(false);
      expect(hasPath(object2, 'item.value.numeric.value')).toEqual(false);
      expect(hasPath(object2, 'item.value.integer')).toEqual(false);
    });

    it('should return the correct value for every case', () => {
      const object = {
        foo: {
          bar: {
            value: 1,
          },
        },
      };

      const object2 = {
        item: {
          value: {
            numeric: {
              string: null,
            },
          },
        },
      };

      expect(hasPath(object, 'foo.bar.value', true)).toEqual(1);
      expect(hasPath(object, 'foo.bar', true)).toEqual(object.foo.bar);
      expect(hasPath(object2, 'item.value.numeric.string', true)).toEqual(null);
      expect(hasPath(object2, 'item.value.numeric', true)).toEqual(
        object2.item.value.numeric,
      );
    });

    it('should return the null for every case', () => {
      const object = {
        foo: {
          bar: {
            value: 1,
          },
        },
      };

      const object2 = {
        item: {
          value: {
            numeric: {
              string: null,
            },
          },
        },
      };

      expect(hasPath(object, 'foo.bar.values', true)).toEqual(null);
      expect(hasPath(object, 'foo.barsd', true)).toEqual(null);
      expect(hasPath(object2, 'item.value.numeric.value', true)).toEqual(null);
      expect(hasPath(object2, 'item.value.integer', true)).toEqual(null);
    });
  });
});
