import type { FileStatus } from "../types";
import type { Tone } from "@workspace/ui";
import { BiUndo, BiRevision, BiTrash } from "react-icons/bi";
import type { IconType } from "react-icons";

type StatusConfigItem = {
  key: FileStatus;
  label: string;
  tone: Tone;
  icon: IconType;
  actionLabel: string;
};

/**
 * Configuration visuelle et comportementale associée à chaque statut Git.
 *
 * Centralise :
 * - label affiché
 * - tone (UI)
 * - icône d'action
 * - libellé de l'action
 *
 * Permet de garder une UI cohérente et scalable.
 */
export const STATUS_CONFIG: Record<FileStatus, StatusConfigItem> = {
  modified: {
    key: "modified",
    label: "Modifié",
    tone: "warning",
    icon: BiUndo,
    actionLabel: "Annuler les modifications",
  },
  deleted: {
    key: "deleted",
    label: "Supprimé",
    tone: "danger",
    icon: BiRevision,
    actionLabel: "Restaurer le fichier",
  },
  untracked: {
    key: "untracked",
    label: "Non suivi",
    tone: "success",
    icon: BiTrash,
    actionLabel: "Supprimer le fichier",
  },
};