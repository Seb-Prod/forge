import { Button, Showcase } from "@workspace/ui";
import { buttonDocs } from "./Button.docs";

/**
 * 🧪 Composant demo / playground pour Button
 */
export const ButtonDemo = () => (
  <Showcase
    name="Button"
    description="Le composant Button permet de déclencher des actions utilisateur via un élément interactif."
    functionality={[
      "Différentes apparences : filled, outline, ghost, link",
      "Tonalités sémantiques : primary, secondary, success, danger…",
      "Tailles configurables : sm, md, lg",
      "Animations au survol configurables",
      "Support des icônes : icon, startIcon, endIcon",
      "Mode iconOnly pour boutons icône",
      "État loading avec texte personnalisable",
      "Gestion du disabled et accessibilité (aria-label)",
      "Largeur flexible avec fullWidth",
    ]}
    component={Button}
    docs={buttonDocs}
  />
);