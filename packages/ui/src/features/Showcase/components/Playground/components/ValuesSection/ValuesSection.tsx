import { Card, Text, Input, Box } from "@workspace/ui";
import { Control } from "src/features/Showcase/Showcase.types";

interface ValuesSectionProps {
  controls?: Record<string, Control>;
  props: Record<string, any>;
  propsDocs?: Partial<Record<string, { description?: string; type?: string }>>;
  updateProp: (name: string, value: any) => void;
}

export const ValuesSection = ({
  controls = {},
  propsDocs = {},
  props,
  updateProp,
}: ValuesSectionProps) => {
  const textControls = Object.entries(controls).filter(
    ([, control]) => control.type === "text",
  );

  if (!textControls.length) return null;

  return (
    <Box radius={"md"} shadow="2xl" tone="secondary">
      <Text align="center">Values</Text>

      {textControls.map(([propName, control]) => {
        const label = control.label ?? propName;
        const description = propsDocs?.[propName]?.description;
        return (
          <Input
            key={propName}
            labelPosition="floating"
            label={label}
            value={props[propName] ?? ""}
            onChange={(e) => updateProp(propName, e.target.value)}
            helperText={description}
          />
        );
      })}
    </Box>
  );
};
