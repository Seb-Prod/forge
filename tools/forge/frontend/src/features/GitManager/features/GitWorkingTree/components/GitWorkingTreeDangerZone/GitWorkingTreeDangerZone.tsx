import { Box, Button, Text, Title } from "@workspace/ui";
import styles from "./GitWorkingTreeDangerZone.module.css";

export const GitWorkingTreeDangerZone = () => {
  return (
    <Box
      flexDirection="row"
      shadow="md"
      radius={"xl"}
      surface="muted"
      tone="danger"
      className={styles.container}
    >
      <div>
        <Title tone="danger" as="h4">
          Zone dangereuse
        </Title>
        <Text tone="danger">
          Réinitialise tout — modifications perdues définitivement
        </Text>
      </div>
      <Button tone="danger">Reset --hard</Button>
    </Box>
  );
};
