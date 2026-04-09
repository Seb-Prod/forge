import { Action } from "../../types/action.types";

export const TOOLS_ACTIONS: Action[] = [
  {
    id: "open-vscode",
    name: "Open VSCode",
    description: "Ouvrir le projet dans VSCode",
    category: "tools",
    script: "open/open-vscode.js",
    allowMultiple: true,
  },
  {
    id: "hello",
    name: "Hello",
    description: "Hello World",
    category: "tools",
    script: "tools/hello.js",
    allowMultiple: false,
  },
  {
    id: "clear",
    name: "Clear",
    description: "Clear la console",
    category: "tools",
    script: "tools/clear.js",
    allowMultiple: false,
  },
  {
    id: "list-browsers",
    name: "List Browsers",
    description: "Lister les navigateurs installés",
    category: "tools",
    script: "tools/list-browsers.js",
    allowMultiple: false,
  },
];