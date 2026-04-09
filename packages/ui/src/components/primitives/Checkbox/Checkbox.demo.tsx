import { Showcase } from "@workspace/ui";
import { CheckboxDocs } from "./Checkbox.docs";
import { Checkbox } from "./Checkbox";

export const CheckboxDemo = () => (
  <Showcase
    name="Checkbox"
    description="Le composant Checkbox permet de sélectionner une option binaire ou tri-état dans un formulaire, avec personnalisation complète."
    functionality={[
      "Support des états : checked, unchecked, indeterminate",
      "Icônes personnalisables pour chaque état (checked / unchecked / indeterminate)",
      "Label optionnel et configurables en taille et style",
      "Gestion controlled et uncontrolled",
      "Styles configurables : appearance, tone, size",
      "Accessible : l'état indeterminate appliqué via la propriété DOM",
      "Support du focus et du hover via CSS",
      "Compatible avec les formulaires et les composants réactifs"
    ]}
    component={Checkbox}
    docs={CheckboxDocs}
  />
);