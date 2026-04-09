import { Showcase } from "@workspace/ui/features";
import { BoxDocs } from "./Box.docs";
import { Box } from "../Box";

export const BoxDemo = () => (
  <Showcase.Auto
    name="Box"
    description="Composant Box ..."
    component={ Box }
    docs={ BoxDocs }
  />
);