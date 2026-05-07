import { Box, Button, Text, Title, useTheme } from "@workspace/ui";
import styles from "./GitWorkingTreeDangerZone.module.css";

export const GitWorkingTreeDangerZone = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Box
      flexDirection="row"
      shadow
      radius={"xl"}
      tone="danger"
      surface="raised"
      justifyContent="between"
      className={styles.container}
    >
      <div>
        <Title as="h4">Zone dangereuse</Title>
        <Text>Réinitialise tout — modifications perdues définitivement</Text>
        <button onClick={toggleTheme}>
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
      <Button tone="danger">Reset --hard</Button>
    </Box>
  );
};
