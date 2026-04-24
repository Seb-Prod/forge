import { Box, Text, type Tone } from "@workspace/ui";

export const FileStatusList = ({
  label,
  paths,
  tone
}: {
  label: string;
  paths: string[];
  tone: Tone;
}) => {
  if (paths.length === 0) return null;

  return (
    <>
      <Text>
        {label} ({paths.length})
      </Text>
      <Box overflow="both" maxHeight="100px" tone={tone} padding={"sm"} radius={"md"}>
        {paths.map((path) => (
          <Text key={path} size="sm" intensity={600}>
            {path}
          </Text>
        ))}
      </Box>
    </>
  );
};
