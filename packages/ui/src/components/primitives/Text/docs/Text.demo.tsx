import { Showcase } from "@workspace/ui/features";
import { TextDocs } from "./Text.docs";
import { Text } from "../Text";

export const TextDemo = () => (
  <Showcase
    name="Text"
    description="Composant typographique de base du design system."
    functionality={[
      "Balise HTML sémantique configurable : p, span, h1–h6, label, strong, em…",
      "Tailles configurables via tokens CSS : xs, sm, md, lg, xl, 2xl, 3xl",
      "Graisse configurable : regular, medium, semibold, bold",
      "Alignement : left, center, right, justify",
      "Transformation de casse : uppercase, lowercase, capitalize",
      "Décoration : underline, line-through",
      "Tonalités sémantiques : primary, secondary, success, danger…",
      "Couleur directe (hex, rgb, rgba) si pas de tone",
      "Italique, truncate et lineClamp",
    ]}
    component={Text}
    docs={TextDocs}
  />
);