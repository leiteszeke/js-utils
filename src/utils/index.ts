/* eslint-disable no-bitwise */
import { Color } from '../types';

export const hexToRgb = (hexValue: string): Color => {
  const result: Array<string> = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hexValue,
  ) || ['0', '0', '0', '0'];

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: 1,
  };
};

export const rgbToHex = (r: number, g: number, b: number): string =>
  `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;

export const colorWithOpacity = (
  color: string,
  opacity: number = 0.5,
): string => {
  const { r, g, b } = hexToRgb(color);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
