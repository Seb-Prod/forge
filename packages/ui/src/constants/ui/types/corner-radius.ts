export type CornerRadius<T> =
  | T
  | {
      topLeft?: T;
      topRight?: T;
      bottomLeft?: T;
      bottomRight?: T;
    };