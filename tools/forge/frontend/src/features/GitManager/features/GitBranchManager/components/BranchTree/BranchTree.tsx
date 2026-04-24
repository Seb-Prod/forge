import type { JSX } from "react";
import { BranchNode } from "../BranchNode";
import { useGitRepository } from "@/features/GitManager/context";

interface BranchTreeProps {
  parent?: string | null;
  depth?: number;
}

/**
 * BranchTree
 *
 * Génère récursivement la liste à plat des nœuds de l'arbre de branches.
 *
 * Filtre les branches par `parent` à chaque niveau et s'appelle récursivement
 * pour construire l'arborescence complète en profondeur.
 *
 */
export const BranchTree = ({
  parent = null,
  depth = 0,
}: BranchTreeProps): JSX.Element[] => {
  const { mergedBranches, currentBranch } =
    useGitRepository();

  return mergedBranches
    .filter((b) => b.parent === parent)
    .flatMap((branch) => {
      const isActive = branch.name === currentBranch;
      return [
        <BranchNode
          key={branch.name}
          branch={branch}
          depth={depth}
          isActive={isActive}
        />,
        ...BranchTree({
          parent: branch.name,
          depth: depth + 1,
        }),
      ];
    });
};
