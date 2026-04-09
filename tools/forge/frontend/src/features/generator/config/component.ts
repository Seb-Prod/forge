import { namingStrategies } from "../utils/naming";
import type { GeneratorTypeConfig } from "./generatorTypes";

export const componentConfig: GeneratorTypeConfig = {
  id: "component",
  label: "Component",
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
    { key: "types", label: "Types", description: "Fichier .types.ts séparé", defaultEnabled: true },
    { key: "style", label: "CSS", description: "Fichier CSS Module", defaultEnabled: true },
    { key: "showcase", label:"Showcase", description:"Fichier de configuration du pour Showcase", defaultEnabled: true},
    { key: "barrel", label: "Index", description: "Fichier index.ts (barrel)", defaultEnabled: true },
    { key: "docs", label: "README", description: "Fichier README.md", defaultEnabled: false },
  ],
  fileGenerators: {
    folder: () => [],
    types: (name) => [{ name: `${name}.types.ts`, type: "ts" }],
    style: (name) => [{ name: `${name}.module.css`, type: "css" }],
    showcase: (name) => [{ name: `${name}.docs.ts`, type: "ts" }, {name: `${name}.demo.tsx`, type: "tsx" }],
    barrel: () => [{ name: "index.ts", type: "ts" }],
    docs: () => [{ name: "README.md", type: "md" }],
    
  },
};