# Select

Composant select pour la sélection d'une option dans une liste déroulante. Supporte le mode contrôlé, la recherche intégrée, et un positionnement intelligent du dropdown via portal.

---

## Usage

```tsx
import { Select } from "@workspace/ui";

<Select
  label="Framework"
  options={[
    { value: "react",   label: "React"   },
    { value: "vue",     label: "Vue.js"  },
    { value: "svelte",  label: "Svelte"  },
    { value: "angular", label: "Angular" },
  ]}
  onSelect={(value) => console.log(value)}
/>
```

---

## Props

| Prop          | Type                      | Défaut           | Requis | Description                                    |
|---------------|---------------------------|------------------|--------|------------------------------------------------|
| `label`       | `string`                  | —                | ✓      | Label affiché à côté ou au-dessus du select    |
| `options`     | `SelectOption[]`          | —                | ✓      | Liste des options `{ value, label, disabled? }`|
| `onSelect`    | `(value: string) => void` | —                | ✓      | Callback appelé à la sélection                 |
| `value`       | `string`                  | —                |        | Valeur sélectionnée (mode contrôlé)            |
| `placeholder` | `string`                  | `"Select option"`|        | Texte affiché si aucune sélection              |
| `tone`        | `SelectTone`              | `"neutral"`      |        | Tonalité sémantique                            |
| `appearance`  | `SelectAppearance`        | `"outline"`      |        | Style visuel                                   |
| `size`        | `SelectSize`              | `"md"`           |        | Taille du composant                            |
| `variant`     | `SelectVariant`           | `"default"`      |        | Variante (avec ou sans recherche)              |
| `topLabel`    | `boolean`                 | `false`          |        | Place le label au-dessus (au lieu de à gauche) |
| `startIcon`   | `ReactNode`               | —                |        | Icône avant le texte du trigger                |
| `helperText`  | `string`                  | —                |        | Message d'aide affiché sous le select          |
| `disabled`    | `boolean`                 | `false`          |        | Désactive le composant                         |

---

## Variantes

### `tone`

Définit la couleur sémantique du composant.

| Valeur      | Description                              |
|-------------|------------------------------------------|
| `neutral`   | Neutre, sans connotation sémantique      |
| `primary`   | Couleur principale                       |
| `secondary` | Couleur secondaire                       |
| `danger`    | État d'erreur ou de validation échouée   |
| `success`   | État de validation réussie               |

### `appearance`

Définit le style visuel du composant.

| Valeur    | Description                             |
|-----------|-----------------------------------------|
| `outline` | Bordure colorée, fond transparent       |
| `filled`  | Fond plein coloré                       |
| `soft`    | Fond coloré léger, rendu discret        |
| `ghost`   | Bordure et fond transparents            |

### `size`

| Valeur | Hauteur |
|--------|---------|
| `sm`   | 32px    |
| `md`   | 40px    |
| `lg`   | 48px    |

### `variant`

| Valeur       | Description                            |
|--------------|----------------------------------------|
| `default`    | Select standard                        |
| `searchable` | Avec champ de recherche et bouton clear|

---

## Architecture

```
Select/
├── Select.tsx                  # Composant racine
├── Select.types.ts             # Types, constantes, interfaces
├── Select.context.ts           # Context + hook useSelectContext
├── Select.hooks.ts             # Hook useSelect (logique métier)
├── Select.docs.ts              # Config Showcase (Storybook-like)
├── SelectDemo.tsx              # Page de démo
└── components/
    ├── SelectTrigger/
    │   └── SelectTrigger.tsx   # Bouton d'ouverture du dropdown
    ├── SelectDropdown/
    │   ├── SelectDropdown.tsx  # Dropdown rendu via portal
    │   └── hooks/
    │       └── useSelectPosition.ts  # Calcul de position (top/bottom)
    ├── SelectSearch/
    │   └── SelectSearch.tsx    # Champ de recherche
    ├── SelectOption/
    │   └── SelectOption.tsx    # Ligne d'option
    └── SelectClearButton/
        └── SelectClearButton.tsx  # Bouton de réinitialisation
```

---

## Mode contrôlé

```tsx
const [value, setValue] = useState("");

<Select
  value={value}
  onSelect={setValue}
  options={options}
  label="Framework"
/>
```

---

## TODO

Les points suivants sont identifiés et restent à implémenter :

### 🔴 Accessibilité (prioritaire)

Le composant n'est pas encore accessible aux utilisateurs de lecteurs d'écran.

- [ ] Ajouter `aria-haspopup="listbox"` et `aria-expanded={open}` sur le trigger
- [ ] Ajouter `aria-controls` sur le trigger pointant vers le dropdown
- [ ] Ajouter `role="listbox"` sur le conteneur d'options
- [ ] Ajouter `role="option"` et `aria-selected` sur chaque `SelectOption`
- [ ] Ajouter `aria-disabled` sur les options désactivées
- [ ] Ajouter un `aria-label` ou `aria-labelledby` reliant le label au trigger

### 🟠 Navigation clavier dans le dropdown

`highlightedIndex` est géré dans le state mais pas encore branché sur le rendu.

- [ ] Appliquer un style visuel sur l'option `highlightedIndex` dans `SelectOption`
- [ ] Gérer `ArrowUp` / `ArrowDown` / `Enter` / `Escape` depuis `SelectDropdown`
- [ ] Scroll automatique vers l'option mise en surbrillance si elle sort du viewport

### 🟡 Props non câblées

Ces props sont déclarées dans `SelectProps` et documentées mais pas encore utilisées dans le rendu :

- [ ] `placeholder` — `SelectTrigger` affiche `"Select option"` en dur
- [ ] `startIcon` — déclaré dans les types mais non rendu dans le trigger
- [ ] `helperText` — déclaré dans les types mais non rendu sous le select

### 🟢 Améliorations mineures

- [ ] Ajouter `disabled` sur le `<button>` du trigger quand la prop est passée
- [ ] Gérer `option.disabled` dans `SelectOption` (`aria-disabled` + style + blocage du clic)