import { Showcase } from "@workspace/ui";
import { InputDocs } from "./Input.docs";
import { Input } from "./Input";

export const InputDemo = () => (
  <Showcase
    name="Input"
    description="Le composant Input permet de saisir différents types de données dans un champ de formulaire configurable."
    functionality={[
      "Types supportés : text, email, number, tel, password",
      "Variantes visuelles configurables : appearance, tone, size",
      "Position du label : top, left, floating",
      "États de validation : error, success",
      "Texte d'aide dynamique",
      "Icônes startIcon",
      "Bouton d'effacement automatique",
      "Affichage / masquage du mot de passe",
      "Compatible avec les formulaires contrôlés ou non contrôlés"
    ]}
    component={Input}
    docs={InputDocs}
  />
);