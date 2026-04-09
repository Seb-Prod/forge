import { ComponentType } from "react";
import { DocsConfig } from "./Showcase.types";
import { Functionnality, Playground, PropsTable } from "./components";
import {  Box, Text } from "@workspace/ui/components";
interface ShowcaseProps {
  /** Nom du composant */
  name: string;

  /** Description générale */
  description?: string;

  /** Liste des fonctionnalités à afficher dans le showcase */
  functionality?: string[];

  /** Composant React à afficher */
  component: ComponentType<any>;

  /** Documentation du composant */
  docs: DocsConfig;
}

export const Showcase = ({
  name,
  description,
  component,
  docs,
  functionality,
}: ShowcaseProps) => {
  return (
    <Box>
      <header>
        <Text as="h1" size="3xl" weight="bold">{name}</Text>
        {description && <Text>{description}</Text>}
      </header>
      <Functionnality functionnality={functionality} />
      <Playground
        component={component}
        constants={docs.constants}
        controls={docs.controls}
        defaultProps={docs.defaultProps}
        propsDocs={docs.propsDocs}
      />
      <PropsTable docs={docs.propsDocs} defaults={docs.defaultProps} />
      {/* <ShowcasePropsTable props={docs.propsTable} />
      <ShowcaseProps>
        <ShowcaseEnums
          items={docs.constants}
          defaults={docs.defaultProps}
        />
      </ShowcaseProps> */}
    </Box>
  );
};
