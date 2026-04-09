import { Button } from "@workspace/ui";
import { FaCodeBranch, FaTrashAlt } from "react-icons/fa";
import styles from "../styles/BranchNode.module.css";

interface BranchActionsProps {
  isActive?: boolean;
  hasModifications?: boolean;
  canDelete?: boolean;
  branchName: string;
  onCheckout: () => void;
  onDelete: () => void;
}

export const BranchActions = ({
  isActive,
  hasModifications,
  canDelete,
  branchName,
  onCheckout,
  onDelete,
}: BranchActionsProps) => {
  return (
    <div className={styles.action}>
      <Button
        size="sm"
        startIcon={<FaCodeBranch />}
        appearance="outline"
        tone="success"
        animation="center"
        disabled={isActive || hasModifications}
        aria-label={`Checkout ${branchName}`}
        className={isActive ? styles.visible : ""}
        onClick={onCheckout}
      >
        Checkout
      </Button>

      <Button
        size="sm"
        startIcon={<FaTrashAlt />}
        tone="danger"
        disabled={!canDelete}
        aria-label={`Delete ${branchName}`}
        className={!canDelete ? styles.visible : ""}
        onClick={onDelete}
      >
        Delete
      </Button>
    </div>
  );
};
