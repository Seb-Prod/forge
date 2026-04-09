// 🧠 Type générique pour toutes les constantes UI

export type UIConstant<T extends string> = {
  value: T;
  label: string;
  description: string;
};

