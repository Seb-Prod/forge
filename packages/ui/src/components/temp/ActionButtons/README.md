# ActionButtons

Composant de boutons d'actions (fermer, agrandir, réduire) avec animations.

## Usage

```tsx
import { ActionButtons } from "@votre-org/ui";

<ActionButtons 
  onClose={handleClose}
  onExpand={handleExpand}
  onCollapse={handleCollapse}
/>
```

## Props

### ActionButtons

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `onClose` | `() => void` | - | Callback de fermeture |
| `onExpand` | `() => void` | - | Callback d'agrandissement |
| `onCollapse` | `() => void` | - | Callback de réduction |
| `disableClose` | `boolean` | `false` | Désactive le bouton close |
| `disableExpand` | `boolean` | `false` | Désactive le bouton expand |
| `disableCollapse` | `boolean` | `false` | Désactive le bouton collapse |
| `className` | `string` | - | Classes CSS supplémentaires |

### ActionButton (usage individuel)

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `action` | `'close' \| 'expand' \| 'collapse'` | `'close'` | Type d'action |
| `onClick` | `() => void` | - | Callback au clic |
| `disabled` | `boolean` | `false` | Désactive le bouton |
| `aria-label` | `string` | auto | Label accessible |

## Exemples

### Tous les boutons

```tsx
<ActionButtons 
  onClose={() => console.log('close')}
  onExpand={() => console.log('expand')}
  onCollapse={() => console.log('collapse')}
/>
```

### Seulement fermer

```tsx
<ActionButtons onClose={handleClose} />
```

### Avec états désactivés

```tsx
<ActionButtons 
  onClose={handleClose}
  onExpand={handleExpand}
  disableExpand={isMaximized}
/>
```

### Bouton individuel

```tsx
import { ActionButton } from "@votre-org/ui";

<ActionButton action="close" onClick={handleClose} />
<ActionButton action="expand" onClick={handleExpand} disabled />
```

## Actions disponibles

- **close** : Bouton rouge (danger) avec icône ✕, rotation 12° au hover
- **expand** : Bouton vert (success) avec icône +, rotation -12° au hover  
- **collapse** : Bouton orange (warning) avec icône −, pas de rotation

## Animations

- **Hover** : Scale 1.2 + rotation selon l'action
- **Active** : Scale 0.8 + rotation selon l'action
- **Disabled** : Opacité 0.5, pas d'animation
- **prefers-reduced-motion** : Désactive toutes les animations

## Positionnement

Par défaut, le container est positionné en **absolu** :
- `top: -24px`
- `right: 0`
- `z-index: 10`

Vous pouvez surcharger avec `className` si besoin.

## Dépendances

Nécessite **react-icons** pour les icônes (MdClose, MdAdd, MdRemove).

```bash
pnpm add react-icons
```

## Accessibilité

- Labels ARIA automatiques (Fermer, Agrandir, Réduire)
- Respecte `prefers-reduced-motion`
- Curseur `not-allowed` quand désactivé