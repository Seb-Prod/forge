import { useGitRepository } from "../../context";
import { useFileSelection } from "./hooks/useFileSelection";
import {
  GitStatusFilter,
  GitWorkingTreeActions,
  GitWorkingTreeContent,
  GitWorkingTreeDangerZone,
  GitWorkingTreeHeader,
  GitWorkingTreeSelectionActions,
} from "./components";
import { VIEW_OPTIONS, type View } from "./types";
import { useLocalStorage } from "@workspace/ui/hooks";
import { Box, Text } from "@workspace/ui";
import styles from "./GitWorkingTree.module.css";

/**
 * GitWorkingTree
 *
 * Panneau de sélection des fichiers Git modifiés avant staging.
 *
 * - Persiste la vue active (`"tree"` ou `"list"`) dans le `localStorage` via `useLocalStorage`.
 * - Délègue la gestion de la sélection à `useFileSelection`.
 * - Permet une sélection groupée par statut via `GitStatusFilter`.
 * - Ouvre la modale de commit avec les fichiers sélectionnés.
 */
export const GitWorkingTree = () => {
  const { gitData } = useGitRepository();
  const isValidView = (v: unknown): v is View =>
    VIEW_OPTIONS.includes(v as View);

  const [view, setView] = useLocalStorage<View>(
    "git:view",
    "tree",
    isValidView,
  );
  const {
    checked,
    toggleCheck,
    toggleAllByStatus,
    selectedFiles,
    selectedCount,
    tree,
  } = useFileSelection(gitData);

  return (
    <Box gap="md">
      <GitWorkingTreeHeader />
      <GitWorkingTreeActions
        view={view}
        onViewChange={setView}
        selectedFiles={selectedFiles}
        selectedCount={selectedCount}
      />
      <GitWorkingTreeSelectionActions
        selectedCount={selectedCount}
        selectedFiles={selectedFiles}
      />
      <GitWorkingTreeContent
        view={view}
        tree={tree}
        checked={checked}
        toggleCheck={toggleCheck}
      />
      {view === "tree" && (
        <Text align="center" size="xs">
          Les fichiers sont regroupés par dossier. Cliquez sur un dossier pour
          l'ouvrir
        </Text>
      )}
      <GitStatusFilter
        checked={checked}
        onToggleAllByStatus={toggleAllByStatus}
      />
      <GitWorkingTreeDangerZone />
    </Box>
  );
};
