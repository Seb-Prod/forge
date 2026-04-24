import { useRef } from "react";
import styles from "./GitBranchManager.module.css";
import { BranchPaths } from "./components/BranchPaths";
import { BranchTree } from "./components/BranchTree";
import { useGitModal, useGitRepository } from "../../context";
import { Button, Text } from "@workspace/ui";
import { LuGitBranchPlus } from "react-icons/lu";
import { Box } from "../../../../../../../../packages/ui/src/components/primitives/Box/Box";

/**
 * GitBranchManager
 *
 * Affiche un arbre de branches avec les chemins de connexion entre elles.
 *
 * - Mise en évidence la branche active.
 * - Affichage si la branche est en local et distante.
 * - Possibilité de supprimer une branche.
 * - Possibilité de renommer une branche.
 * - Changement de branche.
 * - Création d'une nouvelle branche depuis la branche active.
 */
export const GitBranchManager = () => {
  const { hasModifications } = useGitRepository();
  const { openModal } = useGitModal();

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Button
        className={styles.button}
        size="sm"
        startIcon={<LuGitBranchPlus />}
        disabled={hasModifications}
        onClick={() => openModal("create-branch")}
      >
        Créer une branche
      </Button>

      <Box overflow="y" maxHeight="350px" minHeight="350px">
        <div className={styles.container} ref={containerRef}>
          <BranchPaths containerRef={containerRef} />
          <BranchTree />
        </div>
      </Box>

      {hasModifications && (
        <Text tone="warning" size="md">
          ⚠️ Impossible de créer ou de changer de branche tant que des
          modifications locales sont présentes.
        </Text>
      )}
    </>
  );
};
