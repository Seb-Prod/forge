import { FaCodeBranch, FaTrashAlt, FaEdit } from "react-icons/fa";

import { useGitModal, useGitRepository } from "@/features/GitManager/context";
import { isProtectedBranch } from "@/features/GitManager/constants/protectedBranch";
import { KebabMenu } from "@workspace/ui";

interface BranchActionsProps {
  branchName: string;
  isActive: boolean;
  className: string;
}

/**
 * Actions contextuelles d'une branche git (checkout, rename, delete).
 * Calcule les permissions selon l'état de la branche et délègue l'affichage à KebabMenu.
 */
export const BranchActions = ({
  branchName,
  isActive,
  className,
}: BranchActionsProps) => {
  const { openModal } = useGitModal();
  const { hasModifications } = useGitRepository();

  const isProtected = isProtectedBranch(branchName);

  const canCheckout = !isActive && !hasModifications;
  const canRename = !isProtected;
  const canDelete = !isProtected && !isActive;

  const actions = [
    {
      label: "Checkout",
      icon: <FaCodeBranch />,
      disabled: !canCheckout,
      onClick: () => openModal("checkout", { branchName }),
    },
    {
      label: "Rename",
      icon: <FaEdit />,
      disabled: !canRename,
      onClick: () => openModal("rename", { branchName }),
    },
    {
      label: "Delete",
      icon: <FaTrashAlt />,
      disabled: !canDelete,
      variant: "danger" as const,
      onClick: () => openModal("delete", { branchName }),
    },
  ];

  return (
    <div className={className}>
      <KebabMenu actions={actions} />
    </div>
  );
};
