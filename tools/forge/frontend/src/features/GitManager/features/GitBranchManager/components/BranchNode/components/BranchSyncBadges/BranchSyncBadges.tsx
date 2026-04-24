import { Badge, Box } from "@workspace/ui";

interface BranchSyncBadgesProps {
  hasLocal: boolean;
  hasRemote: boolean;
}

/**
 * Badges indiquant la présence de la branche en local et/ou en remote.
 */
export const BranchSyncBadges = ({
  hasLocal,
  hasRemote,
}: BranchSyncBadgesProps) => {
  return (
    <Box flexDirection="row" gap="xs" margin={"xs"} padding={"xs"} surface="none">
      {hasLocal && (
        <Badge tone="success">
          Local
        </Badge>
      )}

      {hasRemote && (
        <Badge tone="info">
          Remote
        </Badge>
      )}
    </Box>
  );
};
