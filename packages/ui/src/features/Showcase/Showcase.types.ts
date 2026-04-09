export type EnumItem = {
  readonly value: string;
  readonly label: string;
  readonly description?: string;
};

export type EnumGroup = Record<string, EnumItem>;

export type Control =
  | { type: "text"; label?: string; defaultValue?: string }
  | { type: "boolean"; label?: string; defaultValue?: boolean }
  | { type: "image"; label?: string }
  | { type: "icon"; label?: string }
  | { type: "action"; label?: string }
  | { type: "node"; label?: string };

export interface DocsConfig<T = any> {
  constants?: Record<string, any>;

  controls?: Partial<Record<keyof T, any>>;

  defaultProps?: Partial<T>;

  propsDocs?: Partial<
    Record<
      keyof T,
      {
        description?: string;
        type?: string;
      }
    >
  >;
}

export type ComponentWithName = React.ElementType & {
  displayName?: string;
  name?: string;
};
