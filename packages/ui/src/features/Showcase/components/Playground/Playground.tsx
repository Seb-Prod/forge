import React, { useState, useMemo, useCallback } from "react";
import { Box, Card, GridLayout, Text } from "@workspace/ui";
import { generateJsx } from "./utils/generateJsx";
import {
  ComponentWithName,
  Control,
  DocsConfig,
  EnumGroup,
} from "../../Showcase.types";
import {
  OptionsSection,
  ValuesSection,
  StatesSection,
  MediasSection,
  ActionsSection,
} from "./components";

export interface PlaygroundProps {
  component: React.ElementType;
  constants?: Record<string, EnumGroup>;
  controls?: Record<string, Control>;
  defaultProps?: Record<string, any>;
  propsDocs?: DocsConfig["propsDocs"];
}

export const Playground = ({
  component: Component,
  constants = {},
  controls = {},
  defaultProps = {},
  propsDocs = {},
}: PlaygroundProps) => {
  const [props, setProps] = useState<Record<string, any>>(defaultProps);

  const updateProp = useCallback((name: string, value: any) => {
    setProps((prev) => ({ ...prev, [name]: value }));
  }, []);

  const componentName =
    (Component as ComponentWithName).displayName ??
    (Component as ComponentWithName).name ??
    "Component";

  const jsxCode = useMemo(
    () => generateJsx(componentName, props),
    [props, componentName],
  );

  return (
    <Box border="xs" radius="md">
      <Text as="h3" size="3xl" tone="primary">
        Playground
      </Text>
      <Text>
        Modifiez les propriétés du composant et observez le rendu ainsi que le
        JSX généré.
      </Text>
      <section style={{ marginBottom: 32 }}>
        {/* CONTROLS */}
        <Box>
          {/** Propriétés du composant */}
          <GridLayout minItemWidth="240px">
            <OptionsSection
              constants={constants}
              props={props}
              updateProp={updateProp}
            />
            <ValuesSection
              controls={controls}
              props={props}
              updateProp={updateProp}
              propsDocs={propsDocs}
            />
            <StatesSection
              controls={controls}
              props={props}
              updateProp={updateProp}
            />
            <MediasSection
              controls={controls}
              props={props}
              updateProp={updateProp}
            />
            <ActionsSection
              controls={controls}
              props={props}
              updateProp={updateProp}
            />
          </GridLayout>
        </Box>

        {/** JSX & Preview */}
        <GridLayout columns={2}>
          <Box>
            <Component {...props} />
          </Box>
          <Box>
            <pre
              style={{
                padding: 16,
                borderRadius: 8,
                background: "#0f172a",
                color: "#e2e8f0",
                fontSize: 13,
                overflowX: "auto",
              }}
            >
              {jsxCode}
            </pre>
          </Box>
        </GridLayout>
      </section>
    </Box>
  );
};
