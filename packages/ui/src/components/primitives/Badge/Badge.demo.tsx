import { Badge, Showcase } from "@workspace/ui";
import { badgeDocs } from "./Badge.docs";

/**
 * 🧪 Composant demo / playground pour Badge
 */
export const BadgeDemo = () => (
  <Showcase
    name="Badge"
    description="Le composant Badge permet d’afficher des étiquettes, statuts ou indicateurs visuels dans l’interface."
    functionality={[
      "Différentes apparences : filled, outline, ghost",
      "Variantes : default, dot, pill, removable",
      "Tailles configurables : sm, md, lg",
      "Support des icônes startIcon et endIcon",
      "Possibilité de suppression via onRemove pour les badges 'removable'",
      "Contenu texte ou éléments ReactNode",
    ]}
    component={Badge}
    docs={badgeDocs}
  />
);