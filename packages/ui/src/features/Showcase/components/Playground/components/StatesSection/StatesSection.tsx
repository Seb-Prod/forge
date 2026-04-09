import { Card, Text, Checkbox, Box } from "@workspace/ui";
import { Control } from "src/features/Showcase/Showcase.types";

interface StatesSectionProps {
  controls?: Record<string, Control>;
  props: Record<string, any>;
  updateProp: (name: string, value: any) => void;
}

export const StatesSection = ({
  controls = {},
  props,
  updateProp,
}: StatesSectionProps) => {
  const booleanControls = Object.entries(controls).filter(
    ([, c]) => c.type === "boolean",
  );

  if (!booleanControls.length) return null;

  return (
    <Box radius={"md"} shadow="2xl" tone="secondary">
      <Text align="center">States</Text>

      {booleanControls.map(([propName, control]) => {
        const label = control.label ?? propName;
        return (
          <Checkbox
            key={propName}
            label={label}
            onChange={(e) => updateProp(propName, e.target.checked)}
            checked={props[propName] ?? false}
          />
        );
      })}
    </Box>
  );
};
