import { useMemo, useState } from "react";
import { buildTree } from "./utils/buildTree";
import { TreeNodeItem } from "./components/TreeNodeItem";

import { Box, Button, ConfirmDialog, Text } from "@workspace/ui";
import { BiArchive, BiSolidArchiveIn } from "react-icons/bi";
import { GitStatusFilter } from "./components";

import { useGit } from "../../context/useGit";
import { CreateCommitDialog } from "./components/Createbranchdialog";
import { runAction } from "@/services/api";

type ActiveModal = "commit" | "result" | null;

type Commit = {
  messages: string[];
  result: boolean;
};

type SelectedFiles = {
  modified: string[];
  deleted: string[];
  untracked: string[];
};

/**
 * `GitStatusSection` — Panneau principal de sélection des fichiers Git modifiés.
 *
 * Agrège les fichiers modifiés, supprimés et non suivis récupérés via `useGit`,
 * les affiche sous forme d'arborescence interactive, et permet à l'utilisateur
 * de les sélectionner individuellement ou par groupe de statut avant de les
 * ajouter à la zone de staging.
 *
 * ### Responsabilités
 * - Construit l'arbre de fichiers avec `buildTree` (mémoïsé).
 * - Gère l'état de sélection (`checked`) pour chaque chemin de fichier.
 * - Expose `toggleCheck` et `toggleAllByStatus` aux composants enfants.
 * - Affiche temporairement les fichiers sélectionnés via une alerte native.
 *
 * ### Composants enfants
 * - `TreeNodeItem` — nœud de l'arborescence, sélectionnable individuellement.
 * - `GitStatusFilter` — sélection groupée par statut (Modifiés / Supprimés / Non suivis).
 *
 * @todo Remplacer l'`alert` par une modal de confirmation de commit
 * exposant deux actions : **Confirmer** ou **Annuler**.
 *
 * @example
 * <GitStatusSection />
 */
export const GitStatusSection = () => {
  const { gitData } = useGit();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [result, setResult] = useState<Commit | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const tree = useMemo(() => {
    if (!gitData) return [];
    return buildTree([
      { paths: gitData.modified, status: "modified" },
      { paths: gitData.deleted, status: "deleted" },
      { paths: gitData.untracked, status: "untracked" },
    ]);
  }, [gitData]);

  const toggleCheck = (path: string) => {
    setChecked((prev) => ({ ...prev, [path]: !prev[path] }));
  };

  const toggleAllByStatus = (paths: string[], value: boolean) => {
    setChecked((prev) => {
      const updated = { ...prev };
      paths.forEach((path) => {
        updated[path] = value;
      });
      return updated;
    });
  };

  const selectedPaths = useMemo(
    () =>
      Object.entries(checked)
        .filter(([, v]) => v)
        .map(([path]) => path),
    [checked],
  );

  const selectedFiles = useMemo<SelectedFiles>(
    () => ({
      modified: (gitData?.modified ?? []).filter((p) => checked[p]),
      deleted: (gitData?.deleted ?? []).filter((p) => checked[p]),
      untracked: (gitData?.untracked ?? []).filter((p) => checked[p]),
    }),
    [checked, gitData],
  );

  const handleCommit = async (commitDescription: string) => {
    setIsLoading(true);

    try {
      const res = await runAction<Commit>("git-commit", [
        "--message",
        commitDescription,
        "--files",
        JSON.stringify(selectedPaths),
      ]);

      setResult(res);

      if (res.result) {
        setChecked({});
        console.log(result)
      }
    } catch {
      setResult({
        result: false,
        messages: ["Une erreur inattendue est survenue."],
      });
    } finally {
      setIsLoading(false);
      setActiveModal("result");
    }
  };

  return (
    <Box margin={"none"} gap="md" padding={"none"}>
      {/* Arborescence des fichiers modifiés */}
      <Box surface="base" shadow="md" radius="md" border="xs">
        <Text size="xl">Sélectionner les fichiers :</Text>

        <Box overflow="y" maxHeight="200px" minHeight="200px">
          {tree.map((node) => (
            <TreeNodeItem
              key={node.path}
              node={node}
              checked={checked}
              onToggleCheck={toggleCheck}
            />
          ))}
        </Box>
      </Box>

      {/* Sélection automatique des fichiers selon le statut */}
      <GitStatusFilter
        checked={checked}
        onToggleAllByStatus={toggleAllByStatus}
      />

      <Button
        onClick={() => setActiveModal("commit")}
        appearance="filled"
        disabled={selectedPaths.length === 0}
        startIcon={
          selectedPaths.length === 0 ? <BiArchive /> : <BiSolidArchiveIn />
        }
      >
        Ajouter au staging ({selectedPaths.length})
      </Button>
      <CreateCommitDialog
        open={activeModal === "commit"}
        onOpenChange={(open) => setActiveModal(open ? "commit" : null)}
        onSubmit={handleCommit}
        isLoading={isLoading}
        selectedFiles={selectedFiles}
      />
      <ConfirmDialog
        open={activeModal === "result"}
        onOpenChange={(open) => setActiveModal(open ? "result" : null)}
        title={result?.result ? "Succès" : "Erreur"}
        description={
          result?.messages?.length
            ? result.messages.join("\n")
            : result?.result
              ? "Commit effectué avec succès"
              : "Une erreur est survenue"
        }
        confirmLabel="OK"
        tone={result?.result ? "success" : "danger"}
        onConfirm={() => setActiveModal(null)}
        hideCancel
      />
    </Box>
  );
};
