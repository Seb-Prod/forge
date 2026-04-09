import type { FileItem } from "../components/FileStructurePreview";

export type NamingStrategy = (raw: string) => string;

export type OptionKey = "folder" | "types" | "style" | "barrel" | "docs" | "showcase";

export interface GeneratorOption {
  key: OptionKey;
  label: string;
  description: string;
  defaultEnabled: boolean;
}

export interface GeneratorTypeConfig {
  id: string;
  label: string;
  /** Extension principale du fichier généré */
  mainExtension: "tsx" | "ts";
  /** Stratégie de nommage appliquée avant génération */
  namingStrategy: NamingStrategy;
  /** Options disponibles pour ce type */
  options: GeneratorOption[];
  /** Génère les fichiers additionnels selon les options */
  fileGenerators: Record<OptionKey, (name: string) => FileItem[]>;
  /** Cibles de dossiers proposées dans le DirectoryExplorer */
  targets: { label: string; path: string }[];
  /** Nom de l'action backend à appeler */
  actionName: string;
}