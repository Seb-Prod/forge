import type { FileStatus } from "../GitStatus.types";
import type { Tone } from "@workspace/ui";

type StatusConfigItem = {
  key: FileStatus;
  label: string;
  tone: Tone;
};

/**
 * Configuration visuelle associée à chaque statut Git.
 * Source de vérité unique partagée entre `GitStatusFilter` et `TreeFileItem`.
 *
 * Défini en tableau pour permettre le `.map()` dans les composants,
 * tout en garantissant que chaque clé de `FileStatus` est couverte.
 *
 * @example
 * const { label, tone } = STATUS_CONFIG.find(s => s.key === "modified")!;
 */
export const STATUS_CONFIG: StatusConfigItem[] = [
  { key: "modified",  label: "Modifié",   tone: "warning" },
  { key: "deleted",   label: "Supprimé",  tone: "danger"  },
  { key: "untracked", label: "Non suivi", tone: "success" },
];