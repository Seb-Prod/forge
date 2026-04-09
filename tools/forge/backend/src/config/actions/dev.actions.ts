import { Action } from "../../types/action.types";

export const DEV_ACTIONS: Action[] = [
  {
    id: "start-frontend",
    name: "Frontend App",
    description: "Démarrer l'application frontend (apps/frontend)",
    category: "dev",
    script: "start-frontend.js",
    allowMultiple: false,
    endpoint: { label: "App", url: "http://localhost:5175" },
  },
  {
    id: "start-backend",
    name: "Backend API",
    description: "Démarrer l'API backend (apps/backend)",
    category: "dev",
    script: "start-backend.js",
    allowMultiple: false,
    endpoint: { label: "API", url: "http://localhost:8000" },
  },
  {
    id: "start-docker",
    name: "MySQL",
    description: "Démarrer Docker Desktop, MySQL et PhpMyAdmin",
    category: "dev",
    script: "start-docker.js",
    allowMultiple: false,
    endpoint: { label: "PhpMyAdmin", url: "http://localhost:8081" },
  },
];