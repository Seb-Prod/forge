import { Card, Text, Select, Box } from "@workspace/ui";
import { EnumGroup } from "src/features/Showcase/Showcase.types";

interface OptionSectionProps {
  constants?: Record<string, EnumGroup>;
  props: Record<string, any>;
  updateProp: (name: string, value: any) => void;
}

export const OptionsSection = ({
  constants = {},
  props,
  updateProp,
}: OptionSectionProps) => {
  return (
    <Box radius={"md"} shadow="2xl" tone="secondary">
      <Text align="center">Options</Text>
      {Object.entries(constants).map(([propName, options]) => (
        <Select
          key={propName}
          label={propName}
          value={props[propName] ?? ""}
          onSelect={(value) => updateProp(propName, value)}
          options={Object.entries(options).map(([, entry]) => ({
            value: entry.value,
            label: entry.label,
          }))}
        />
      ))}
    </Box>
  );
};
