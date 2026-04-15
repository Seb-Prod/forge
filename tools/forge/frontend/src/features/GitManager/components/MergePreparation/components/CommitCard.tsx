import { COMMIT_TYPES } from "@/features/GitManager/constants/commits";
import { parseCommitMessage } from "../utils/parseCommitMessage";
import { Box, Title, Text, Badge } from "@workspace/ui";

type Props = {
  message: string;
  hash: string;
};

export const CommitCard = ({ message, hash }: Props) => {
  const parsed = parseCommitMessage(message);

  const meta = COMMIT_TYPES[parsed.type] ?? COMMIT_TYPES.chore;

  const Icon = meta.icon;

  return (
    <Box
      radius={"md"}
      surface="raised"
      border="xs"
      shadow="xl"
      style={{ borderLeft: `4px solid ${meta.color}` }}
    >
      {/* Header */}
      <Box
        flexDirection="row"
        surface="none"
        margin={"none"}
        padding={"none"}
        gap={"md"}
        style={{ alignItems: "center" }}
      >
        <Icon color={meta.color} size={22} />
        <Title as="h4">{parsed.type}</Title>

        <Badge>{parsed.scope}</Badge>
      </Box>
      <Text size="xs">({parsed.typeDescription})</Text>
      {/* Message */}
      <Text variant="body" size="lg">
        {parsed.message}
      </Text>

      {/* Footer */}
      <Text size="xs" tone="neutral" intensity={200}>
        {hash}
      </Text>
    </Box>
  );
};
