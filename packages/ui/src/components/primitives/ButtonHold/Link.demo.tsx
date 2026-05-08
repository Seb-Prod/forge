import { Link, Showcase } from "@workspace/ui";
import { buttonDocs } from "./Button.docs";

/**
 * 🧪 Composant demo / playground pour Link
 */
export const LinkDemo = () => (
  <Showcase
    name="Link"
    description="Le composant Link permet de naviguer entre les pages tout en conservant l’apparence et le comportement d’un bouton."
    functionality={[
      "Navigation via React Router (prop 'to')",
      "Même API que Button pour une cohérence totale",
      "Différentes apparences : filled, outline, ghost, link",
      "Support des icônes : icon, startIcon, endIcon",
      "Mode iconOnly pour liens icône",
      "Animations au survol configurables",
      "État loading (utile pour navigation async)",
      "Accessibilité avec aria-label",
      "Largeur flexible avec fullWidth",
    ]}
    component={Link}
    docs={buttonDocs}
  />
);