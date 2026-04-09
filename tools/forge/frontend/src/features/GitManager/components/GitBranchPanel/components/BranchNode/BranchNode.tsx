import { useState } from "react";
import styles from "./styles/BranchNode.module.css";

import { getColor } from "@/features/GitManager/constants/branchColors";
import type { Branch } from "../../GitBranchPanel";
import { BranchInfo } from "./components/BranchInfo";
import { BranchActions } from "./components/BranchActions";
import { BranchActionModal } from "./components/BranchActionModal";
import { runAction } from "@/services/api";

interface BranchNodeProps {
  branch: Branch;
  depth: number;
  isActive: boolean;
  hasModifications: boolean;
  onDelete?: (branchName: string) => void;
  onCheckout?: (branchName: string) => void;
}

export type GitDelete = {
  branch: string;
  parent: string;
};

export const BranchNode = ({
  branch,
  depth,
  isActive,
  hasModifications,
  onDelete,
  onCheckout,
}: BranchNodeProps) => {
  const [activeModal, setActiveModal] = useState<"delete" | "checkout" | null>(
    null,
  );

  const color = getColor(depth);

  const canDelete =
    branch.name !== "main" && branch.name !== "develop" && !isActive;

  const handleDelete = async () => {
    onDelete?.(branch.name);
    const result = await runAction<GitDelete>("git-delete-branch", [
      "--parent",
      branch.parent ?? "",
      "--branch",
      branch.name,
    ]);
    console.log(result)
    setActiveModal(null);
  };

  const handleCheckout = () => {
    onCheckout?.(branch.name);
    setActiveModal(null);
  };

  return (
    <>
      <div className={styles.row}>
        <div
          data-branch={branch.name}
          className={`${styles.node} ${isActive ? styles.activeNode : ""}`}
          style={{ marginLeft: depth * 20, borderColor: color, color }}
        />

        <BranchInfo branch={branch} isActive={isActive} />
        <BranchActions
          isActive={isActive}
          hasModifications={hasModifications}
          canDelete={canDelete}
          branchName={branch.name}
          onCheckout={() => setActiveModal("checkout")}
          onDelete={() => setActiveModal("delete")}
        />
      </div>

      <BranchActionModal
        type={activeModal}
        branchName={branch.name}
        open={!!activeModal}
        onOpenChange={(open) => setActiveModal(open ? activeModal : null)}
        onConfirm={activeModal === "delete" ? handleDelete : handleCheckout}
      />
    </>
  );
};
