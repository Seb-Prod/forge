import styles from "./BranchNode.module.css";
import type { Branch } from "@/features/GitManager/types/types";
import {
  BranchActions,
  BranchDot,
  BranchName,
  BranchSyncBadges,
} from "./components";
import { Box } from "@workspace/ui";

interface BranchNodeProps {
  branch: Branch;
  depth: number;
  isActive: boolean;
}

/**
 * 🎯 BranchNode
 *
 * Représente une branche Git dans l'interface utilisateur.
 *
 * Ce composant est purement présentationnel et délègue la logique métier
 * aux composants enfants (notamment BranchActions).
 *
 * ---
 *
 * 🧱 Structure :
 * - BranchDot → affichage du point dans le graphe Git
 * - BranchName → affichage du nom de la branche et si elle est active
 * - BranchSyncBadges → état de synchronisation (local / remote)
 * - BranchActions → menu d’actions (checkout, rename, delete)
 *
 * ---
 *
 * 🎨 Layout :
 * - Colonne gauche : graphe + nom (indentation via `depth`)
 * - Colonne droite : badges + menu d’actions
 *
 * ---
 *
 * ⚙️ Comportement :
 * - `depth` contrôle l'indentation visuelle
 * - `isActive` permet d’adapter le style et les actions disponibles
 *
 * ---
 *
 * @component
 * @param {BranchNodeProps} props - Propriétés du composant
 * @returns {JSX.Element} Élément React représentant une ligne de branche
 *
 * @example
 * ```tsx
 * <BranchNode
 *   branch={{ name: "feature/login", local: true, remote: false }}
 *   depth={1}
 *   isActive={false}
 * />
 * ```
 */
export const BranchNode = ({ branch, depth, isActive }: BranchNodeProps) => {
  return (
    <Box flexDirection="row" margin={"none"} padding={"xs"} gap={"none"} className={styles.row} radius={"md"}>
      {/* colonne gauche : largeur fixe, absorbe l'indentation */}
      <div className={styles.graphCol}>
        <BranchDot depth={depth} isActive={isActive} branchName={branch.name} />

        <div className={styles.nameCol}>
          <BranchName branchName={branch.name} isActive={isActive} />
        </div>
      </div>

      {/* badges + actions : toujours alignés à droite */}
      <div className={styles.actionsCol}>
        <BranchSyncBadges hasLocal={branch.local} hasRemote={branch.remote} />

        <BranchActions
          className={styles.branchActions}
          branchName={branch.name}
          isActive={isActive}
        />
      </div>
    </Box>
  );
};
