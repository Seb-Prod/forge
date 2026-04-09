import { Showcase } from "@workspace/ui/features";
import { {{name}}Docs } from "./{{name}}.docs";
import { {{name}} } from "./{{name}}";

export const {{name}}Demo = () => (
  <Showcase.Auto
    name="{{name}}"
    description="Composant {{name}} ..."
    component={ {{name}} }
    docs={ {{name}}Docs }
  />
);