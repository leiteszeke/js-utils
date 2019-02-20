export function fixNumber(input:number, base:number = 2) :number {
  return Number.parseFloat(input.toFixed(base));
}

export function toFixedFix(inputN: number, inputPrec: number): number {
  const k = 10 ** inputPrec;
  return Number.parseFloat((Math.round(inputN * k) / k).toFixed(inputPrec));
}

export function numberFormat(
  inputNumber: number,
  decimals: number = 2,
  thouSeparator: string = '.',
  decSeparator: string = ',',
) {
  const value: string = (`${inputNumber}`).replace(/[^0-9+\-Ee.]/g, '');
  const n = !Number.isFinite(+value) ? 0 : +value;
  const prec = !Number.isFinite(+decimals) ? 0 : Math.abs(decimals);
  let s: string[] | string = '';

  s = (prec ? toFixedFix(n, prec).toString() : `${Math.round(n)}`).split('.');

  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thouSeparator);
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += [prec - s[1].length + 1].join('0');
  }

  return s.join(decSeparator);
}
