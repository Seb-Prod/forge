// Types partagés pour l'application Forge
export type ActionCategory = "dev" | "tools" | "generator" | "git";
export interface DevProcess {
  id: string;
  name: string;
  description: string;
  category: ActionCategory;
  script: string;
  allowMultiple?: boolean;
  status: "running" | "stopped" | "error";
  pid?: number;
  endpoint?: Endpoint;
}

export interface Endpoint {
  label: string;
  url: string;
}


export interface HealthResponse {
  status: string;
  timestamp: string;
}

export interface ActionsResponse {
  actions: DevProcess[];
}

export interface ActionResponse {
  success: boolean;
  message: string;
}

type ServiceId = "start-frontend" | "start-backend" | "start-docker";

export type ServiceConfig = {
  id: ServiceId;
  prefix: string;
  image?:string;
};

export type TollConfig = {
  id: string;
}

export type Entry = {
  name: string;
  type: "file" | "folder";
  path: string;
  depth: number;
};

export type TreeNode = Entry & {
  children: TreeNode[];
};