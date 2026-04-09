# Card

Composant conteneur générique (`Card`) pour structurer et mettre en valeur du contenu avec variantes visuelles, tonalités sémantiques et mode interactif accessible.

## 📦 Installation

``` tsx
import { Card } from '@workspace/ui/components';
```

---

## 🃏 Card

Composant flexible permettant d'afficher du contenu dans un conteneur
stylisé avec en-tête, pied de page, variantes de surface et tonalités.

### 🚀 Exemples d'utilisation

#### Carte basique

``` tsx
<Card title="Profil utilisateur">
  <p>Contenu de la carte</p>
</Card>
```

#### Variantes de surface

``` tsx
<Card variant="base">Surface par défaut</Card>
<Card variant="elevated">Surface surélevée</Card>
<Card variant="outlined">Surface avec contour</Card>
```

#### Tonalités sémantiques

``` tsx
<Card tone="primary" title="Information">
  Mise à jour disponible
</Card>

<Card tone="danger" variant="outlined" title="Erreur">
  Une erreur s'est produite
</Card>
```

#### Tailles

``` tsx
<Card size="sm">Petite carte</Card>
<Card size="md">Carte moyenne</Card>
<Card size="lg">Grande carte</Card>
```

#### Avec action dans le header

``` tsx
<Card
  title="Notifications"
  headerAction={<Button size="sm">Voir tout</Button>}
>
  Contenu principal
</Card>
```

#### Avec footer

``` tsx
<Card
  title="Abonnement"
  footer={<Button variant="primary">Valider</Button>}
>
  Détails de l'abonnement
</Card>
```

#### Carte interactive (cliquable)

``` tsx
<Card
  title="Voir le profil"
  interactive
  aria-label="Accéder au profil utilisateur"
  onClick={() => console.log('Carte cliquée')}
>
  Cliquez pour voir les détails
</Card>
```

#### Élément HTML personnalisé

``` tsx
<Card as="article" title="Article">
  Contenu sémantique
</Card>
```

### 📋 Props de Card

  -----------------------------------------------------------------------------------------------------------------------------------------
  Prop             Type                                                                       Défaut            Description
  ---------------- -------------------------------------------------------------------------- ----------------- ---------------------------
  `title`          `string`                                                                   \-                Titre affiché dans
                                                                                                                l'en-tête

  `variant`        `"base" \| "elevated" \| "outlined"`                                       `"base"`          Style de surface

  `tone`           `"neutral" \| "primary" \| "success" \| "warning" \| "danger" \| "info"`   `"neutral"`       Tonalité sémantique

  `size`           `"sm" \| "md" \| "lg"`                                                     `"md"`            Taille de la carte

  `as`             `"div" \| "article" \| "section"`                                          `"div"`           Élément HTML racine

  `footer`         `ReactNode`                                                                \-                Contenu du pied de carte

  `headerAction`   `ReactNode`                                                                \-                Élément à droite du header

  `interactive`    `boolean`                                                                  `false`           Rend la carte cliquable

  `onClick`        `() => void`                                                               \-                Gestionnaire de clic
                                                                                                                (obligatoire si
                                                                                                                `interactive`)

  `aria-label`     `string`                                                                   \-                Requis si
                                                                                                                `interactive=true`

  `className`      `string`                                                                   `""`              Classes CSS supplémentaires

  `style`          `CSSProperties`                                                            \-                Styles inline

  `children`       `ReactNode`                                                                \-                Contenu principal
  -----------------------------------------------------------------------------------------------------------------------------------------

**+ Toutes les props HTML natives de `<div>` (hors `className`)**

------------------------------------------------------------------------

## 🎨 Variantes disponibles

### Surface variants

-   `base` (défaut) -- Surface standard
-   `elevated` -- Ombre portée
-   `outlined` -- Bordure visible

### Tonalités

-   `neutral` (défaut)
-   `primary`
-   `success`
-   `warning`
-   `danger`
-   `info`

### Tailles

-   `sm` -- Compacte
-   `md` -- Standard
-   `lg` -- Spacieuse

------------------------------------------------------------------------

## ⚡ Mode interactif

Quand `interactive={true}` :

-   La carte devient focusable
-   Support clavier (`Enter` / `Space`)
-   Rôle ARIA automatique `button`
-   `aria-label` obligatoire

``` tsx
<Card
  interactive
  aria-label="Ouvrir les détails"
  onClick={handleOpen}
>
  Carte cliquable
</Card>
```

------------------------------------------------------------------------

## ♿ Accessibilité

### Support natif

-   Navigation clavier automatique si interactive
-   `role="button"` ajouté en mode interactif
-   Focus visible via CSS
-   `aria-label` requis pour cartes cliquables
-   Support lecteurs d'écran

### Bonnes pratiques

✔ Toujours fournir un `aria-label` si la carte est interactive\
✔ Utiliser `article` ou `section` si pertinent sémantiquement\
✔ Éviter les cartes cliquables imbriquées

------------------------------------------------------------------------

## 🎨 Personnalisation CSS

Le composant expose des attributs `data-*` :

``` css
/* Variante de surface */
[data-surface="elevated"] { }
[data-surface="outlined"] { }

/* Tonalité */
[data-card-tone="primary"] { }
[data-card-tone="danger"] { }

/* Carte interactive */
[data-interactive="true"] { }
```

Classes CSS disponibles : - `.card` - `.card--base` -
`.card--elevated` - `.card--outlined` - `.card--interactive` -
`.cardHeader` - `.cardContent` - `.cardFooter`

------------------------------------------------------------------------

## 🧠 Bonnes pratiques

### Utiliser Card pour :

✅ Structurer du contenu\
✅ Afficher des blocs d'information\
✅ Créer des listes interactives\
✅ Présenter des états (succès, erreur, info)

### Éviter Card pour :

❌ Actions principales isolées\
❌ Navigation principale\
❌ Conteneurs trop imbriqués

------------------------------------------------------------------------

## 📁 Structure des fichiers

    Card/
    ├── Card.tsx
    ├── Card.types.ts
    ├── Card.module.css
    └── README.md

------------------------------------------------------------------------

## 🐛 Debugging

### La carte ne s'affiche pas correctement

1.  Vérifiez l'import de `Card.module.css`
2.  Vérifiez la configuration CSS modules
3.  Inspectez les attributs `data-*` dans le DOM

### Le clic ne fonctionne pas

1.  Vérifiez `interactive={true}`
2.  Vérifiez que `onClick` est fourni
3.  Vérifiez la présence de `aria-label`

### Le focus clavier ne marche pas

1.  Vérifiez que `interactive` est activé
2.  Vérifiez l'absence de `pointer-events: none`
3.  Inspectez le `tabIndex`

------------------------------------------------------------------------

## 🔗 Composants associés

-   `Button`
-   `ButtonLink`
-   `classNames` utilitaire
-   `@workspace/styles`

------------------------------------------------------------------------

**Prêt pour la production** ✅
