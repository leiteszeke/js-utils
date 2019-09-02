import { rgbToHex, hexToRgb, colorWithOpacity } from '../index';

describe('utils module', () => {
	const white = { rgb: [255, 255, 255], hex: '#ffffff' };
	const red = { rgb: [255, 0, 0], hex: '#ff0000' };
	const blue = { rgb: [0, 0, 255], hex: '#0000ff' };
	const niceGreen = { rgb: [3, 252, 186], hex: '#03fcba' };

	describe('test rgbToHex', () => {
		describe('convert a RGB Value to Hexadecimal', () => {
			it('should return its corresponding hexa color', () => {
				expect(rgbToHex(white.rgb[0], white.rgb[1], white.rgb[2])).toEqual(white.hex);
				expect(rgbToHex(red.rgb[0], red.rgb[1], red.rgb[2])).toEqual(red.hex);
				expect(rgbToHex(blue.rgb[0], blue.rgb[1], blue.rgb[2])).toEqual(blue.hex);
				expect(rgbToHex(niceGreen.rgb[0], niceGreen.rgb[1], niceGreen.rgb[2])).toEqual(niceGreen.hex);

				expect(rgbToHex(white.rgb[0], white.rgb[1], white.rgb[2])).not.toBe(white.hex.toUpperCase());
				expect(rgbToHex(red.rgb[0], red.rgb[1], red.rgb[2])).not.toBe(red.hex.toUpperCase());
				expect(rgbToHex(blue.rgb[0], blue.rgb[1], blue.rgb[2])).not.toBe(blue.hex.toUpperCase());
				expect(rgbToHex(niceGreen.rgb[0], niceGreen.rgb[1], niceGreen.rgb[2])).not.toBe(niceGreen.hex.toUpperCase());
				expect(rgbToHex(niceGreen.rgb[0], niceGreen.rgb[1], niceGreen.rgb[2])).not.toBe(white.hex.toUpperCase());
			});
		});
	});

	describe('test hexToRgb', () => {
		describe('convert a Hexadecimal to RGB Value', () => {
			it('should return its corresponding rgb values', () => {
				const toObject = color => { return { r: color[0], g: color[1], b: color[2], a: 1 }; };

				expect(hexToRgb(white.hex)).toEqual(toObject(white.rgb));
				expect(hexToRgb(red.hex)).toEqual(toObject(red.rgb));
				expect(hexToRgb(blue.hex)).toEqual(toObject(blue.rgb));
				expect(hexToRgb(niceGreen.hex)).toEqual(toObject(niceGreen.rgb));

				expect(hexToRgb(niceGreen.hex)).not.toBe({});
				expect(hexToRgb(white.hex)).not.toBe('rgba(255, 255, 255, 1)');
			});
		});
	});

	describe('test colorWithOpacity', () => {
		describe('convert a hexadecimal value to a rgb with alpha', () => {
			it('should return its corresponding rgba values', () => {
				const toString = (color, opacity = 0.5) =>
					`rgba(${ color[0] }, ${ color[1] }, ${ color[2] }, ${ opacity })`;

				expect(colorWithOpacity(white.hex)).toEqual(toString(white.rgb));
				expect(colorWithOpacity(red.hex, 0.4)).toEqual(toString(red.rgb, 0.4));
				expect(colorWithOpacity(blue.hex, 0.7)).toEqual(toString(blue.rgb, 0.7));
				expect(colorWithOpacity(niceGreen.hex, 1)).toEqual(toString(niceGreen.rgb, 1));

				expect(hexToRgb(niceGreen.hex)).not.toBe({});
				expect(hexToRgb(white.hex)).not.toBe('rgba(255, 255, 255, 1)');
			});
		});
	});
});
