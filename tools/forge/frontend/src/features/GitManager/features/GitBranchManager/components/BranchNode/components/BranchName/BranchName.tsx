import { Badge, Box, Text } from "@workspace/ui";

interface BranchNameProps {
  branchName: string;
  isActive?: boolean;
}

/**
 * Affiche le nom d'une branche avec un badge HEAD si elle est active.
 */
export const BranchName = ({ branchName, isActive }: BranchNameProps) => {
  return (
    <Box flexDirection="row" gap={"xs"} surface={isActive ? "base" : "none"} tone={isActive ? "info" : undefined} margin={"xs"} padding={"xs"} radius={"md"}>
      <Text truncate>
        {branchName}
      </Text>

      {isActive && <Badge>HEAD</Badge>}
    </Box>
  );
};
