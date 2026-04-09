# Animations

Système d'animations réutilisables pour les composants interactifs (Button, Switch, etc.), basé sur des **data-attributes** normalisés.

## Usage
```tsx
import { Button } from "@workspace/ui";

export function Example() {
  return (
    <Button appearance="ghost" data-animation="center">
      Bouton animé
    </Button>
  );
}
```

### Structure
```
animations/
├── animations.css
└── README.md
```

## Animations disponibles

### Animations Clip-Path (pour Ghost & Outline)

| Animation | Direction | Origine | Description |
|-----------|-----------|---------|-------------|
| `center` | Expansion | Centre | Expansion depuis le centre (défaut Ghost) |
| `left` | Horizontal | Bord gauche | Balayage de gauche à droite (défaut Outline) |
| `right` | Horizontal | Bord droit | Balayage de droite à gauche |
| `top` | Vertical | Bord haut | Balayage de haut en bas |
| `bottom` | Vertical | Bord bas | Balayage de bas en haut |
| `top-left` | Diagonale | Coin haut-gauche | Expansion depuis le coin |
| `top-right` | Diagonale | Coin haut-droite | Expansion depuis le coin |
| `bottom-left` | Diagonale | Coin bas-gauche | Expansion depuis le coin |
| `bottom-right` | Diagonale | Coin bas-droite | Expansion depuis le coin |
| `circle` | Radiale | Centre | Expansion circulaire |
| `split-h` | Split | Centre vertical | Division horizontale |
| `split-v` | Split | Centre horizontal | Division verticale |

### Animations Link (pour appearance="link")

| Animation | Type | Description |
|-----------|------|-------------|
| `underline-left` | Soulignement | Ligne de gauche à droite (défaut Link) |
| `underline-center` | Soulignement | Ligne depuis le centre |
| `underline-fade` | Soulignement | Ligne apparaît en fade |

## Comportement automatique

Les animations sont **appliquées automatiquement** selon l'apparence du composant :

- `appearance="ghost"` → `data-animation="center"`
- `appearance="outline"` → `data-animation="left"`
- `appearance="link"` → `data-animation="underline-left"`
- `appearance="filled"` → Pas d'animation clip-path (transitions couleur uniquement)

## Exemples

### Animations par défaut
```tsx
{/* Animation automatique : center */}
<Button appearance="ghost">Ghost Button</Button>

{/* Animation automatique : left */}
<Button appearance="outline">Outline Button</Button>

{/* Animation automatique : underline-left */}
<Button appearance="link">Link Button</Button>
```

### Personnalisation de l'animation
```tsx
{/* Forcer une animation spécifique */}
<Button appearance="ghost" data-animation="circle">
  Expansion circulaire
</Button>

<Button appearance="outline" data-animation="top">
  Balayage vertical
</Button>

<Button appearance="link" data-animation="underline-center">
  Soulignement centré
</Button>
```

### Désactiver l'animation
```tsx
{/* Supprimer l'attribut data-animation */}
<Button appearance="ghost" data-animation={undefined}>
  Sans animation
</Button>
```

## Options avancées

### Vitesse d'animation (optionnel)
```tsx
<Button 
  appearance="ghost" 
  data-animation="center"
  data-animation-speed="slow"
>
  Animation lente
</Button>
```

**Valeurs disponibles :**
- `"fast"` → 0.25s
- `"normal"` → 0.45s (défaut)
- `"slow"` → 0.7s

### Courbe d'animation (optionnel)
```tsx
<Button 
  appearance="outline" 
  data-animation="left"
  data-animation-easing="bounce"
>
  Animation avec rebond
</Button>
```

**Valeurs disponibles :**
- `"ease"` → ease (défaut)
- `"ease-in"` → ease-in
- `"ease-out"` → ease-out
- `"bounce"` → cubic-bezier(0.34, 1.56, 0.64, 1)
- `"smooth"` → cubic-bezier(0.25, 0.46, 0.45, 0.94)

## Personnalisation CSS

Le système d'animations repose sur des **data-attributes normalisés**, partagés entre tous les composants interactifs.

Ces attributs sont **centralisés dans `animations.css`** et font partie de l'API publique.

### Attributs exposés

- `data-animation="center | left | right | top | bottom | ..."`
- `data-animation-speed="slow | normal | fast"`
- `data-animation-easing="ease | ease-in | ease-out | bounce | smooth"`

### Exemple de surcharge
```css
/* Modifier la vitesse de toutes les animations "center" */
[data-animation="center"]::after {
  transition-duration: 0.6s;
}

/* Changer la couleur de fond pour un composant spécifique */
.my-button[data-animation="left"]::after {
  background-color: rgba(255, 0, 0, 0.1);
}
```

> ⚠️ Il est recommandé de ne pas modifier directement les styles internes, mais de s'appuyer exclusivement sur ces attributs.

## Détails techniques

### Fonctionnement clip-path

Les animations clip-path utilisent un pseudo-élément `::after` positionné derrière le contenu du bouton :
```css
[data-animation]::after {
  content: "";
  position: absolute;
  inset: 0;
  background-color: var(--bg-subtle-hover);
  border-radius: inherit;
  z-index: -1;
  transition: clip-path 0.45s ease;
}
```

Le `clip-path` passe d'une forme minimale (point, ligne) à un rectangle complet au survol.

### Fonctionnement underline

Les animations underline utilisent également `::after` mais positionnées différemment :
```css
[data-animation="underline-left"]::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: currentColor;
  transition: width 0.3s ease;
}
```

### Variables CSS utilisées

- `--bg-subtle-hover` : Couleur de fond au survol (définie par tone)

## Accessibilité

- Les animations respectent `prefers-reduced-motion` (à implémenter si besoin)
- Pas d'impact sur la sémantique ou l'accessibilité clavier
- Les états `:disabled` et `[data-loading]` désactivent automatiquement les animations

## Compatibilité

- Navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Support de `clip-path` requis
- Dégradation gracieuse : si clip-path non supporté, l'animation ne s'affiche pas mais le composant reste fonctionnel

## Démonstration

Les animations sont démontrées dans :

- `Button.demo.tsx` (section "Animations au survol")

Ces démos sont destinées au showcase interne du design system et ne font pas partie de l'API publique stable.