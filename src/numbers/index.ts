import { padArray } from '../arrays/index';

export function fixNumber(input:number, base:number = 2) :number {
  return Number.parseFloat(input.toFixed(base));
}

export function toFixedFix(inputN: number, precision: number): number {
  const k = 10 ** precision;
  return Number.parseFloat((Math.round(inputN * k) / k).toFixed(precision));
}

export function numberFormat(
  inputNumber: number,
  decimals: number = 2,
  thouSeparator: string = '.',
  decSeparator: string = ',',
) {
  const value: string = (`${inputNumber}`).replace(/[^0-9+\-Ee.]/g, '');
  const n = !Number.isFinite(+value) ? 0 : +value;
  const precision = !Number.isFinite(+decimals) ? 0 : Math.abs(decimals);
  let s: string[] | string = '';

  s = (precision ? toFixedFix(n, precision).toString() : `${Math.round(n)}`).split('.');

  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thouSeparator);
  }

  if (!s[1]) {
  	if (precision > 0) {
    	s[1] = padArray([], precision, '0').join('');
    }
  } else if (s[1].length < precision) {
  	s[1] += padArray([], s[1].length < precision, '0').join('');
  }

  return s.join(decSeparator);
}

export default {
  fixNumber,
  toFixedFix,
  numberFormat,
}
