import { Box, Card, Text } from "@workspace/ui";
import { act } from "react";
import { Control } from "src/features/Showcase/Showcase.types";

interface ActionsSectionProps {
  controls?: Record<string, Control>;
  props: Record<string, any>;
  updateProp: (name: string, value: any) => void;
}

export const ActionsSection = ({
  controls = {},
  props,
  updateProp,
}: ActionsSectionProps) => {
  const actionControls = Object.entries(controls).filter(
    ([, c]) => c.type === "action",
  );

  if (!actionControls.length) return null;

  return (
    <Box>
      <Text align="center">Actions</Text>
      {actionControls.map(([propName, control]) => {
        const label = control.label ?? propName;

        return (
          <button
            key={propName}
            onClick={() => {
              if (props[propName]) props[propName]();
              else alert(`${propName} triggered`);
            }}
          >
            {label}
          </button>
        );
      })}
    </Box>
  );
};
