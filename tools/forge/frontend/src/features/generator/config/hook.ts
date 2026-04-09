import { namingStrategies } from "../utils/naming";
import type { GeneratorTypeConfig } from "./generatorTypes";

export const hookConfig: GeneratorTypeConfig = {
  id: "hook",
  label: "Hook",
  mainExtension: "tsx",
  namingStrategy: namingStrategies.pascal,
  actionName: "generate-component",
  targets: [
    { label: "App frontend", path: "apps/frontend/src" },
    { label: "Package UI", path: "packages/ui/src" },
    { label: "Tools", path: "tools/forge/frontend/src" },
  ],
  options: [
    { key: "folder", label: "Dossier", description: "Créer un dossier", defaultEnabled: true },
    { key: "types", label: "Types", description: "Fichier .types.ts séparé", defaultEnabled: false },
    { key: "style", label: "CSS", description: "Fichier CSS Module", defaultEnabled: false },
    { key: "barrel", label: "Index", description: "Fichier index.ts (barrel)", defaultEnabled: false },
    { key: "docs", label: "README", description: "Fichier README.md", defaultEnabled: false },
  ],
  fileGenerators: {
    folder: () => [],
    types: (name) => [{ name: `${name}.types.ts`, type: "ts" }],
    style: (name) => [{ name: `${name}.module.css`, type: "css" }],
    barrel: () => [{ name: "index.ts", type: "ts" }],
    docs: () => [{ name: "README.md", type: "md" }],
  },
};