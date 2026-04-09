import { Showcase } from "@workspace/ui/features";
import { IconToggleDocs } from "./IconToggle.docs";
import { IconToggle } from "../IconToggle";

export const IconToggleDemo = () => (
  <Showcase
    name="IconToggle"
    description="Bouton toggle basé sur des icônes permettant de basculer entre deux états (actif / inactif)."
    functionality={[
      "Affiche une icône différente selon l’état (actif ou inactif)",
      "Gestion d’état contrôlée via la prop `pressed`",
      "Interaction via callback `onToggle`",
      "Accessibilité intégrée avec `aria-pressed` et `aria-label`",
      "Personnalisation via tone, size et shadow",
      "Compatible avec n’importe quel ReactNode (react-icons, SVG custom, etc.)",
    ]}
    component={IconToggle}
    docs={IconToggleDocs}
  />
);