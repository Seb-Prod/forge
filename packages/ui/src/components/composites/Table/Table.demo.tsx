import { Showcase } from "@workspace/ui/features";
import { TableDocs } from "./Table.docs";
import { Table } from "./Table";

export const TableDemo = () => (
  <Showcase
    name="Table"
    description="Le composant Table permet d'afficher des données structurées sous forme de tableau avec tri, styles configurables et rendu flexible."

    functionality={[
      "Affichage dynamique des colonnes et des lignes",
      "Tri des colonnes (ascendant / descendant)",
      "Support des cellules personnalisées (JSX)",
      "Styles configurables : tone, surface, size",
      "Mode grille avec bordures (grid)",
      "Mode lignes alternées (zebra)",
      "Mode espacement pour rendu 'card' (spacing)",
      "Responsive avec scroll horizontal automatique",
      "Compatible avec données dynamiques (API, state, etc.)",
      "Intégration facile dans un design system"
    ]}

    component={Table}
    docs={TableDocs}
  />
);