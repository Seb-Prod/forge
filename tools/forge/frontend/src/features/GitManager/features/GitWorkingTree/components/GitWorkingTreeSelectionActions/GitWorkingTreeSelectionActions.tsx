import type { SelectedFiles } from "@/features/GitManager/context/GitModal/GitModalContext.types";
import { Box, Button, Text } from "@workspace/ui";
import type { FileStatus } from "../../types";
import { STATUS_CONFIG } from "../../constants";
import styles from "./GitWorkingTreeSelectionActions.module.css";

interface GitWorkingTreeSelectionActionsProps {
  selectedFiles: SelectedFiles;
  selectedCount: number;
}

export const GitWorkingTreeSelectionActions = ({
  selectedFiles,
  selectedCount,
}: GitWorkingTreeSelectionActionsProps) => {
  const isPlural = selectedCount !== 1;
  const actions = Object.entries(selectedFiles).filter(
    (entry) => entry[1].length > 0,
  );

  return (
    <Box flexDirection="row" shadow="md" radius={"xl"} surface="overlay" className={styles.container}>
      <Text tone="primary">
        {selectedCount} fichier{isPlural ? "s" : ""} sélectionné
        {isPlural ? "s" : ""}
      </Text>
      {actions.map(([status, files]) => {
        const config = STATUS_CONFIG[status as FileStatus];

        const Icon = config.icon;

        return (
          <Button
            key={status}
            tone={config.tone}
            appearance="outline"
            icon={<Icon />}
            iconOnly
          />
        );
      })}
      <Text size="xs" intensity={400} tone="neutral">
        actions groupées
      </Text>
    </Box>
  );
};
