import type { ServiceConfig, TollConfig } from "@/types/types";
import mysqlImg from "@/assets/logos/mysql.png";
import appImg from "@/assets/logos/react.png";
import apiImg from "@/assets/logos/node.js.svg";

export const SERVICES: ServiceConfig[] = [
  {
    id: "start-frontend",
    prefix: "frontend",
    image: appImg,
  },
  {
    id: "start-backend",
    prefix: "backend",
    image: apiImg,
  },
  {
    id: "start-docker",
    prefix: "docker",
    image: mysqlImg,
  },
];

export const TOOLS: TollConfig[] = [{ id: "hello" }, { id: "clear" }];

/**
 * Service spécial VS Code
 */
export const VSCODE_SERVICE = {
  id: "open-vscode",
};


