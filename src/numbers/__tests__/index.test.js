import { toFixedFix, getZeroes, numberFormat } from '../index';

describe('numbers module', () => {
  describe('test toFixedFix', () => {
    describe('input number without decimals', () => {
      it('should return identity', () => {
        expect(toFixedFix(0, 0)).toEqual(0);
        expect(toFixedFix(1, 0)).toEqual(1);
        expect(toFixedFix(0, 1)).toEqual(0);
        expect(toFixedFix(1, 1)).toEqual(1);
        expect(toFixedFix(0, 2)).toEqual(0);
        expect(toFixedFix(1, 2)).toEqual(1);
      });
    });

    describe('input number with decimals', () => {
      it('should return no decimal number', () => {
        expect(toFixedFix(0.0, 0)).toEqual(0);
        expect(toFixedFix(1.0, 0)).toEqual(1);
        expect(toFixedFix(1.1, 0)).toEqual(1);
        expect(toFixedFix(1.111, 0)).toEqual(1);
      });

      it('should return number with one decimal', () => {
        expect(toFixedFix(0.1, 1)).toEqual(0.1);
        expect(toFixedFix(1.10, 1)).toEqual(1.1);
        expect(toFixedFix(1.111, 1)).toEqual(1.1);
      });

      it('should return number with two decimal', () => {
        expect(toFixedFix(0.01, 2)).toEqual(0.01);
        expect(toFixedFix(1.11, 2)).toEqual(1.11);
        expect(toFixedFix(1.111, 2)).toEqual(1.11);
      });
    });
  });

  describe('test getZeroes', () => {
    it('should return n zeroes', () => {
      expect(getZeroes(0)).toEqual('');
      expect(getZeroes(0.0)).toEqual('');
      expect(getZeroes(1)).toEqual('0');
      expect(getZeroes(1.1)).toEqual('0');
      expect(getZeroes(3)).toEqual('000');
    });
  });

  describe('test numberFormat', () => {
    describe('input number without decimals', () => {
      it('should output default format', () => {
        const expectedResult = '18.076.963,00';
        expect(numberFormat(18076963)).toEqual(expectedResult);
      });

      it('should change separator formats', () => {
        const expectedResult = '18,076,963.00';
        expect(numberFormat(18076963, 2, ',', '.')).toEqual(expectedResult);
      });

      it('should have no decimals', () => {
        const expectedResult = '18.076.963';
        expect(numberFormat(18076963, 0)).toEqual(expectedResult);
      });

      it('should have one decimal', () => {
        const expectedResult = '18.076.963,0';
        expect(numberFormat(18076963, 1)).toEqual(expectedResult);
      });

      it('should have three decimals', () => {
        const expectedResult = '18.076.963,000';
        expect(numberFormat(18076963, 3)).toEqual(expectedResult);
      });
    });

    describe('input number with decimals', () => {
      it('should output default format', () => {
        const expectedResult = '18.076.963,21';
        expect(numberFormat(18076963.21)).toEqual(expectedResult);
      });

      it('should change separator formats', () => {
        const expectedResult = '18,076,963.21';
        expect(numberFormat(18076963.21, 2, ',', '.')).toEqual(expectedResult);
      });

      it('should have no decimals', () => {
        const expectedResult = '18.076.963';
        expect(numberFormat(18076963.21, 0)).toEqual(expectedResult);
      });

      it('should have one decimal', () => {
        const expectedResult = '18.076.963,2';
        expect(numberFormat(18076963.21, 1)).toEqual(expectedResult);
      });

      it('should have three decimals', () => {
        const expectedResult = '18.076.963,210';
        expect(numberFormat(18076963.21, 3)).toEqual(expectedResult);
      });
    });
  });
});
