export type Generic<T = any> = {
  [key: string]: T;
};

export type Color = {
  r: number;
  g: number;
  b: number;
  a?: number;
};
