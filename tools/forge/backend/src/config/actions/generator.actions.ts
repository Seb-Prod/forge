import { Action } from "../../types/action.types";

export const GENERATOR_ACTIONS: Action[] = [
  {
    id: "list-directory",
    name: "List Directory",
    description: "Lister le contenu d'un dossier",
    category: "generator",
    script: "generator/list-directory.js",
    allowMultiple: true,
  },
  {
    id: "generate-component",
    name: "Generate Component",
    description: "Créer un component",
    category: "generator",
    script: "generator/run-generator.js",
    allowMultiple: true,
  },
];
