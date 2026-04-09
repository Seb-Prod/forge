# Switch

Composant Switch (toggle) accessible et personnalisable.

## Usage

```tsx
import { Switch } from "@votre-org/ui";

const [enabled, setEnabled] = useState(false);

<Switch checked={enabled} onChange={setEnabled}>
  Activer les notifications
</Switch>
```

## Props

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `checked` | `boolean` | - | État du switch (requis) |
| `onChange` | `(checked: boolean) => void` | - | Callback de changement (requis) |
| `children` | `ReactNode` | - | Label visible |
| `variant` | `primary \| secondary \| success \| warning \| danger \| info` | `primary` | Couleur |
| `appearance` | `filled \| outline` | `filled` | Style |
| `size` | `sm \| md \| lg` | `md` | Taille |
| `disabled` | `boolean` | `false` | Désactivé |
| `aria-label` | `string` | - | Label accessible (obligatoire si pas de children) |

## Exemples

### Variantes

```tsx
<Switch checked={v} onChange={setV} variant="success">Succès</Switch>
<Switch checked={v} onChange={setV} variant="danger">Danger</Switch>
```

### Tailles

```tsx
<Switch checked={v} onChange={setV} size="sm">Petit</Switch>
<Switch checked={v} onChange={setV} size="lg">Grand</Switch>
```

### Outline

```tsx
<Switch checked={v} onChange={setV} appearance="outline">Style outline</Switch>
```

### Sans label visible

```tsx
<Switch checked={v} onChange={setV} aria-label="Mode sombre" />
```

## Personnalisation CSS

```css
.custom-switch {
  --switch-bg: #191717;              /* Fond par défaut */
  --switch-active-bg: #007bff;       /* Fond activé */
  --switch-thumb: #ffffff;           /* Couleur du bouton */
  --switch-active-thumb: #ffffff;    /* Bouton activé */
}
```

## Accessibilité

- Navigation clavier (Tab, Espace, Entrée)
- `role="switch"` et `aria-checked`
- Respecte `prefers-reduced-motion` et `prefers-contrast: more`
- Label obligatoire (visible ou `aria-label`)