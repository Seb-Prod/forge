import { Button, ToggleGroup } from "@workspace/ui";
import {
  BiArchive,
  BiGitBranch,
  BiListUl,
  BiSolidArchiveIn,
} from "react-icons/bi";
import type { View } from "../../types";
import styles from "./GitWorkingTreeActions.module.css";
import { useGitModal, useGitRepository } from "@/features/GitManager/context";
import type { SelectedFiles } from "@/features/GitManager/context/GitModal/GitModalContext.types";

interface GitWorkingTreeActionsProps {
  view: View;
  onViewChange: (view: View) => void;
  selectedFiles: SelectedFiles;
  selectedCount: number;
}

/**
 * GitWorkingTreeActions
 *
 * Barre d'actions du panneau de sélection des fichiers Git modifiés.
 *
 * - Permet de basculer entre la vue arborescence et la vue liste via un `ToggleGroup`.
 * - Ouvre la modale de commit avec les fichiers sélectionnés en payload.
 * - Désactive le bouton de commit tant qu'aucun fichier n'est sélectionné.
 */
export const GitWorkingTreeActions = ({
  view,
  onViewChange,
  selectedFiles,
  selectedCount,
}: GitWorkingTreeActionsProps) => {
  const { currentBranch } = useGitRepository();
  const { openModal } = useGitModal();

  return (
    <div className={styles.container}>
      <ToggleGroup<View>
        value={view}
        onChange={onViewChange}
        options={[
          {
            value: "tree",
            icon: <BiGitBranch />,
            label: "Vue arbre",
            ariaLabel: "Arborescence",
          },
          {
            value: "list",
            icon: <BiListUl />,
            label: "Vue liste",
            ariaLabel: "Liste",
          },
        ]}
      />
      <div className={styles.actions}>
        <Button
          onClick={() =>
            openModal("commit", {
              modal: "commit",
              branchName: currentBranch,
              selectedFiles,
            })
          }
          appearance="filled"
          disabled={selectedCount === 0}
          startIcon={selectedCount === 0 ? <BiArchive /> : <BiSolidArchiveIn />}
        >
          Préparer le commit
        </Button>
      </div>
    </div>
  );
};