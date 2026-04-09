import { Badge, Box, Button, Text } from "@workspace/ui";
import { FaGitAlt } from "react-icons/fa";
import { RiGitBranchLine } from "react-icons/ri";

import styles from "./GitToolBar.module.css";

interface GitToolBarProps {
  currentBranch?: string;
  onShowGraph: () => void;
  showGraph: boolean;
}

export const GitToolBar = ({
  currentBranch,
  onShowGraph,
  showGraph,
}: GitToolBarProps) => {


  return (
    <Box flexDirection="row" margin={"none"} padding={"none"} className={styles.toolBar}>
      <Box flexDirection="row" className={styles.info} margin={"none"} padding={"none"} gap={"8px"}>
        <FaGitAlt size={40} color="#f05032" />
        <Text as="h3">Branche</Text>
        {currentBranch && <Badge size="lg">{currentBranch}</Badge>}
      </Box>

      <Box margin={"none"} padding={"none"}>
        <Button
          size="lg"
          appearance="ghost"
          animation={showGraph ? "right" : "left"}
          tone={showGraph ? "danger" : "success"}
          startIcon={<RiGitBranchLine />}
          onClick={onShowGraph}
        >
          {showGraph ? "Masquer le graphe" : "Voir le graphe"}
        </Button>

      </Box>
    </Box>
  );
};