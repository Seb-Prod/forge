export type AxisSpacing<T> =
  | T
  | {
      x?: T;
      y?: T;
      top?: T;
      bottom?: T;
      left?: T;
      right?: T;
    };
