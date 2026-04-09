import { Badge, Text } from "@workspace/ui";
import type { Branch } from "../../../GitBranchPanel";
import { FaCloud, FaHome } from "react-icons/fa";

import styles from "../styles/BranchNode.module.css";

interface BranchInfoProps {
  branch: Branch;
  isActive?: boolean;
}

export const BranchInfo = ({ branch, isActive }: BranchInfoProps) => {
  return (
    <div className={styles.info}>
      <Text tone={isActive ?  "secondary" : undefined}>
        {branch.name} {isActive && "(HEAD)"}
      </Text>

      {branch.local && (
        <Badge size="sm" variant="pill" tone="success">
          <FaHome />
        </Badge>
      )}

      {branch.remote && (
        <Badge size="sm" variant="pill" tone="info">
          <FaCloud />
        </Badge>
      )}
    </div>
  );
};
