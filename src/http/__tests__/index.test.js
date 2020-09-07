import { client } from '../index';

describe('http module', () => {
  describe('test request', () => {
    it('should fetch ditto', () => {
      client.get('https://pokeapi.co/api/v2/pokemon/ditto').then((response) => {
        expect(response.id).toEqual(132);
        expect(response.name).toEqual('ditto');
      });
    });

    it('should fetch pikachu', () => {
      client
        .get('pokemon/pikachu', {}, { baseUrl: 'https://pokeapi.co/api/v2/' })
        .then((response) => {
          expect(response.id).toEqual(25);
          expect(response.name).toEqual('pikachu');
        });
    });

    it('should get 404', () => {
      client.get('https://pokeapi.co/api/v2/pokemon/yugioh').catch((err) => {
        expect(err.statusCode).toEqual(404);
      });
    });
  });
});
