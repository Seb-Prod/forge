import type { SelectedFiles } from "@/features/GitManager/context/GitModal/GitModalContext.types";
import type { GitStatus } from "@/features/GitManager/types";
import { useMemo, useState } from "react";
import { buildTree } from "../utils";

/**
 * useFileSelection
 *
 * Gère la sélection des fichiers Git modifiés avant staging.
 *
 * - Maintient l'état de sélection (`checked`) pour chaque chemin de fichier.
 * - Construit l'arborescence de fichiers via `buildTree` (mémoïsée).
 * - Calcule les fichiers sélectionnés groupés par statut (`selectedFiles`).
 * - Expose le nombre total de fichiers sélectionnés (`selectedCount`).
 */
export const useFileSelection = (gitData: GitStatus | null) => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleCheck = (path: string) =>
    setChecked((prev) => ({ ...prev, [path]: !prev[path] }));

  const toggleAllByStatus = (paths: string[], value: boolean) =>
    setChecked((prev) => {
      const updated = { ...prev };
      paths.forEach((path) => (updated[path] = value));
      return updated;
    });

  const selectedFiles = useMemo<SelectedFiles>(
    () => ({
      modified: (gitData?.modified ?? []).filter((p) => checked[p]),
      deleted: (gitData?.deleted ?? []).filter((p) => checked[p]),
      untracked: (gitData?.untracked ?? []).filter((p) => checked[p]),
    }),
    [checked, gitData],
  );

  const selectedCount = useMemo(
    () =>
      selectedFiles.modified.length +
      selectedFiles.deleted.length +
      selectedFiles.untracked.length,
    [selectedFiles],
  );

  const tree = useMemo(() => {
    if (!gitData) return [];
    return buildTree([
      { paths: gitData.modified, status: "modified" },
      { paths: gitData.deleted, status: "deleted" },
      { paths: gitData.untracked, status: "untracked" },
    ]);
  }, [gitData]);

  const isChecked = (path: string) => !!checked[path];

  return {
    checked,
    isChecked,
    toggleCheck,
    toggleAllByStatus,
    selectedFiles,
    selectedCount,
    tree,
  };
};
