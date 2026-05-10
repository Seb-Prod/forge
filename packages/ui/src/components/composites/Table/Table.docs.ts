import {  SURFACES, TONES } from "@workspace/ui/constants";
import { createDocs } from "@workspace/ui/features";
import { DEFAULT_PROPS, TableProps } from "./Table.types";

/**
 * 📊 Documentation du composant Table
 *
 * Permet de configurer dynamiquement :
 * - les constantes (tone, size, surface)
 * - les contrôles interactifs (grid, zebra, etc.)
 * - les props par défaut (columns, rows)
 * - la documentation détaillée des props
 */
export const TableDocs = createDocs<TableProps>()({
  // ─────────────────────────────────────────────
  // 🧩 CONSTANTES DISPONIBLES
  // ─────────────────────────────────────────────
  constants: {
    tone: TONES,
    surface: SURFACES,
  },

  // ─────────────────────────────────────────────
  // 🎛️ CONTROLS (playground / UI dynamique)
  // ─────────────────────────────────────────────
  controls: {
    grid: {
      type: "boolean",
      label: "Afficher la grille",
    },

    zebra: {
      type: "boolean",
      label: "Lignes alternées",
    },

    spacing: {
      type: "boolean",
      label: "Espacement des cellules",
    },
    onRowClick: { type: "action", label: "Trigger remove" },
  },

  // ─────────────────────────────────────────────
  // 🎯 PROPS PAR DÉFAUT (preview)
  // ─────────────────────────────────────────────
  defaultProps: {
    ...DEFAULT_PROPS,

    columns: [
      {
        label: "Nom",
        key: "name",
        sortable: true,
      },
      {
        label: "Email",
        key: "email",
        sortable: true,
      },
      {
        label: "Âge",
        key: "age",
        sortable: true,
      },
    ],

    rows: [
      {
        name: "Alice Dupont",
        email: "alice@example.com",
        age: 28,
      },
      {
        name: "Bob Martin",
        email: "bob@example.com",
        age: 35,
      },
      {
        name: "Charlie Durand",
        email: "charlie@example.com",
        age: 22,
      },
    ],
  },

  // ─────────────────────────────────────────────
  // 📚 DOCUMENTATION DES PROPS
  // ─────────────────────────────────────────────
  propsDocs: {
    columns: {
      type: "Column[]",
      description:
        "Définit les colonnes du tableau (label, clé et tri optionnel).",
      required: true,
    },

    rows: {
      type: "Row[]",
      description:
        "Données affichées dans le tableau. Chaque objet correspond à une ligne.",
      required: true,
    },

    tone: {
      type: "Tone",
      description:
        "Définit la tonalité visuelle du tableau (primary, secondary, etc.).",
    },

    surface: {
      type: "Surface",
      description: "Définit le fond du composant (ex: card, flat, etc.).",
    },

    size: {
      type: "Size",
      description:
        "Définit la taille globale du tableau (padding, texte, etc.).",
    },

    grid: {
      type: "boolean",
      description: "Active l'affichage des bordures entre les cellules.",
    },

    zebra: {
      type: "boolean",
      description: "Active l'alternance de couleur entre les lignes (zebra).",
    },

    spacing: {
      type: "boolean",
      description:
        "Ajoute un espacement entre les cellules pour un rendu 'card'.",
    },

    rowKey: {
      type: "string",
      description:
        "Nom de la clé unique pour chaque ligne, utilisée pour la propriété 'key' de React.",
    },

    onRowClick: {
      type: "(row: Row) => void",
      description:
        "Callback déclenché lorsqu’une ligne est cliquée. Recevoit la ligne complète comme argument.",
    },
  },
});
