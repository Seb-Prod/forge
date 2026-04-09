export interface Endpoint {
  label: string;
  url: string;
}

export interface Action {
  id: string;
  name: string;
  description: string;
  category: "dev" | "tools" | "generator" | "git";
  script: string;
  allowMultiple?: boolean;
  endpoint?: Endpoint;
}