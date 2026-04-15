import {
  FiFileText,
  FiRefreshCw,
  FiTool,
  FiCheckCircle,
  FiActivity,
  FiCloud,
  FiLoader,
} from "react-icons/fi";

import { FaBug } from "react-icons/fa";
import { BiSolidZap } from "react-icons/bi";


/**
 * Commit types (Conventional Commits)
 * Format: <type>(<scope>): <message>
 */
export const COMMIT_TYPES = {
  feature: {
    label: "Feature",
    description: "Ajout d’une nouvelle fonctionnalité",
    color: "#22c55e",
    icon: BiSolidZap,
  },
  fix: {
    label: "Fix",
    description: "Correction d’un bug",
    color: "#ef4444",
    icon: FaBug,
  },
  docs: {
    label: "Docs",
    description: "Modifications de la documentation uniquement",
    color: "#3b82f6",
    icon: FiFileText,
  },
  refactor: {
    label: "Refactor",
    description: "Refactorisation sans changement fonctionnel",
    color: "#a855f7",
    icon: FiRefreshCw,
  },
  chore: {
    label: "Chore",
    description: "Tâches techniques (config, maintenance, outils)",
    color: "#94a3b8",
    icon: FiTool,
  },
  test: {
    label: "Test",
    description: "Ajout ou modification de tests",
    color: "#f59e0b",
    icon: FiCheckCircle,
  },
  perf: {
    label: "Perf",
    description: "Amélioration des performances",
    color: "#06b6d4",
    icon: FiActivity,
  },
  ci: {
    label: "CI",
    description: "Intégration continue / déploiement",
    color: "#6366f1",
    icon: FiCloud,
  },
  WIP: {
    label: "WIP",
    description: "Travail en cours (non finalisé)",
    color: "#f97316",
    icon: FiLoader,
  },
} as const;

export type CommitType = keyof typeof COMMIT_TYPES;

/** List of commit types */
export const COMMIT_TYPE_LIST = Object.keys(COMMIT_TYPES) as CommitType[];

/**
 * Commit scopes (monorepo areas)
 */
export const SCOPES = {
  appFrontend: { label: "Frontend", description: "React app" },
  appBackend: { label: "Backend", description: "Node API" },

  ui: { label: "UI", description: "Component library" },
  functions: { label: "Functions", description: "TS utils" },
  styles: { label: "Styles", description: "Global styles" },

  forge: { label: "Forge", description: "Core tool" },
  "forge-frontend": { label: "Forge Frontend", description: "UI" },
  "forge-backend": { label: "Forge Backend", description: "Logic" },
  "forge-template": { label: "Forge Template", description: "Templates" },

  scripts: { label: "Scripts", description: "Automation" },

  repo: { label: "Repo", description: "Global changes" },
  config: { label: "Config", description: "Tooling config" },
  deps: { label: "Dependencies", description: "Deps management" },

  docs: { label: "Docs", description: "Documentation" },
  images: { label: "Images", description: "Assets" },
} as const;

export type Scope = keyof typeof SCOPES;

/** List of scopes */
export const SCOPE_LIST = Object.keys(SCOPES) as Scope[];
