import { Box } from "@workspace/ui";
import { GitTreeView } from "../GitTreeView";
import { GitListView } from "../GitListView";
import { EmptyState } from "../EmptyState";
import { useGitRepository } from "@/features/GitManager/context";
import type { TreeNode, View } from "../../types";

interface GitWorkingTreeContentProps {
  view: View;
  tree: TreeNode[];
  checked: Record<string, boolean>;
  toggleCheck: (path: string) => void;
}

/**
 * GitWorkingTreeContent
 *
 * Zone d'affichage des fichiers Git modifiés.
 *
 * - Bascule entre `GitTreeView` et `GitListView` selon la vue active.
 * - Affiche `EmptyState` quand aucune modification n'est détectée.
 * - Délègue la sélection individuelle des fichiers via `toggleCheck`.
 */
export const GitWorkingTreeContent = ({
  view,
  tree,
  checked,
  toggleCheck,
}: GitWorkingTreeContentProps) => {
  const { hasModifications } = useGitRepository();

  return (
    <Box overflow="y" maxHeight="200px" minHeight="200px" shadow="md" radius={"xl"} surface="overlay">
      {hasModifications ? (
        view === "tree" ? (
          <GitTreeView
            tree={tree}
            checked={checked}
            onToggleCheck={toggleCheck}
          />
        ) : (
          <GitListView
            tree={tree}
            checked={checked}
            onToggleCheck={toggleCheck}
          />
        )
      ) : (
        <EmptyState />
      )}
    </Box>
  );
};