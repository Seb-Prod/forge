import { Select, Showcase } from "@workspace/ui";
import { selectDocs } from "./Select.docs";

export const SelectDemo = () => (
  <Showcase
    name="Select"
    description="Composant select pour la sélection d'une option dans une liste déroulante. Supporte le mode contrôlé, la recherche intégrée, et un positionnement intelligent du dropdown via portal."
    component={Select}
    docs={selectDocs}
  />
);