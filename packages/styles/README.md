# @workspace/styles

<p align="center">
  🎨 Design System • Tokens • Thèmes • Sémantiques
</p>

<p align="center">
  <img src="https://img.shields.io/badge/CSS-Variables-blue?style=for-the-badge&logo=css3" />
  <img src="https://img.shields.io/badge/Thèmes-Light%2FDark-black?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Scope-data--*-orange?style=for-the-badge" />
</p>

<p align="center">
  Tokens primitifs, thèmes light/dark, tones sémantiques et styles scopés par composant — partagés entre toutes les applications du monorepo.
</p>

---

## 📦 Installation

Dans n'importe quel package du monorepo, ajoutez la dépendance :

```json
{
  "dependencies": {
    "@workspace/styles": "workspace:*"
  }
}
```

Puis lancez :

```bash
pnpm install
```

Importez au point d'entrée de votre application :

```ts
// main.tsx ou app.tsx
import "@workspace/styles";
```

---

## 📋 Vue d'ensemble

Ce package centralise l'intégralité du design system selon une architecture en couches :

```
Primitif (tokens/)  →  Sémantique (themes/)  →  Composant (semantics/)
```

- Les tokens **primitifs** (`--brand-*`, `--neutral-*`, `--success-*`…) sont définis sur `:root` dans `tokens/`
- Les tokens **sémantiques** (`--text-*`, `--border-*`) sont définis dans les thèmes et référencent les primitifs
- Les composants consomment uniquement les tokens sémantiques et les aliases de surface

### Structure

```
packages/styles/src/
├── tokens/                    # Variables CSS primitives
│   ├── colors/
│   │   ├── _brand.css         # Palettes primary, secondary, accent
│   │   ├── _neutral.css       # Palette de gris
│   │   ├── _status.css        # success, danger, warning, info, muted
│   │   ├── _surface.css       # Palettes surface-base et surface-elevated
│   │   ├── _interaction.css   # États interactifs (hover, focus…)
│   │   └── index.css
│   ├── _height.css
│   ├── _radii.css
│   ├── _shadows.css
│   ├── _spacing.css
│   ├── _typography.css
│   └── index.css
├── themes/
│   ├── light.css              # Tokens sémantiques — mode clair
│   └── dark.css               # Tokens sémantiques — mode sombre
├── semantics/                 # Styles scopés par composant
│   ├── badge/
│   ├── button/
│   └── …
├── globals.css                # Styles globaux du document
├── reset.css                  # Reset CSS
├── index.css                  # Point d'entrée CSS
└── index.ts                   # Point d'entrée TypeScript
```

---

## 🎨 Tokens

Variables CSS primitives définies sur `:root`, utilisables dans toute l'application.

### Spacing

| Token         | Valeur     | px  |
| ------------- | ---------- | --- |
| `--space-0`   | `0`        | 0   |
| `--space-1`   | `0.25rem`  | 4   |
| `--space-1-5` | `0.375rem` | 6   |
| `--space-2`   | `0.5rem`   | 8   |
| `--space-2-5` | `0.625rem` | 10  |
| `--space-3`   | `0.75rem`  | 12  |
| `--space-4`   | `1rem`     | 16  |
| `--space-5`   | `1.25rem`  | 20  |
| `--space-6`   | `1.5rem`   | 24  |
| `--space-8`   | `2rem`     | 32  |
| `--space-10`  | `2.5rem`   | 40  |
| `--space-12`  | `3rem`     | 48  |
| `--space-16`  | `4rem`     | 64  |

```css
padding: var(--space-4);
gap: var(--space-2);
```

### Height

| Token          | Valeur     | px  |
| -------------- | ---------- | --- |
| `--height-0`   | `0`        | 0   |
| `--height-1`   | `0.25rem`  | 4   |
| `--height-1-5` | `0.375rem` | 6   |
| `--height-2`   | `0.5rem`   | 8   |
| `--height-2-5` | `0.625rem` | 10  |
| `--height-3`   | `0.75rem`  | 12  |
| `--height-4`   | `1rem`     | 16  |
| `--height-5`   | `1.25rem`  | 20  |
| `--height-6`   | `1.5rem`   | 24  |
| `--height-7`   | `1.75rem`  | 28  |
| `--height-8`   | `2rem`     | 32  |
| `--height-10`  | `2.5rem`   | 40  |
| `--height-12`  | `3rem`     | 48  |
| `--height-16`  | `4rem`     | 64  |

```css
height: var(--height-10);
min-height: var(--height-6);
```

### Radius

| Token           | Valeur    | px  |
| --------------- | --------- | --- |
| `--radius-none` | `0`       | 0   |
| `--radius-sm`   | `0.25rem` | 4   |
| `--radius-md`   | `0.5rem`  | 8   |
| `--radius-lg`   | `0.75rem` | 12  |
| `--radius-xl`   | `1rem`    | 16  |
| `--radius-full` | `9999px`  | ∞   |

```css
border-radius: var(--radius-md);
```

### Shadow

| Token           | Valeur                            |
| --------------- | --------------------------------- |
| `--shadow-none` | `0 0px 0px rgba(0, 0, 0, 0.05)`   |
| `--shadow-xs`   | `0 1px 2px rgba(0, 0, 0, 0.05)`   |
| `--shadow-sm`   | `0 1px 3px rgba(0, 0, 0, 0.10)`   |
| `--shadow-md`   | `0 4px 6px rgba(0, 0, 0, 0.07)`   |
| `--shadow-lg`   | `0 10px 15px rgba(0, 0, 0, 0.10)` |
| `--shadow-xl`   | `0 20px 25px rgba(0, 0, 0, 0.15)` |

```css
box-shadow: var(--shadow-md);
```

### Typography

| Token               | Valeur     | Description        |
| ------------------- | ---------- | ------------------ |
| `--text-xs`         | `0.75rem`  | 12px               |
| `--text-sm`         | `0.875rem` | 14px               |
| `--text-md`         | `1rem`     | 16px               |
| `--text-lg`         | `1.125rem` | 18px               |
| `--text-xl`         | `1.25rem`  | 20px               |
| `--text-2xl`        | `1.5rem`   | 24px               |
| `--text-3xl`        | `1.875rem` | 30px               |
| `--font-regular`    | `400`      | Poids normal       |
| `--font-medium`     | `500`      | Poids medium       |
| `--font-semibold`   | `600`      | Poids semibold     |
| `--font-bold`       | `700`      | Poids bold         |
| `--leading-tight`   | `1.25`     | Interligne serré   |
| `--leading-normal`  | `1.5`      | Interligne normal  |
| `--leading-relaxed` | `1.75`     | Interligne aéré    |

```css
font-size: var(--text-sm);
font-weight: var(--font-semibold);
line-height: var(--leading-normal);
```

---

## 🌈 Couleurs

Toutes les palettes sont des tokens **primitifs** définis sur `:root`. Les composants ne les consomment pas directement — ils passent par les aliases de surface ou les tokens sémantiques des thèmes.

### Brand — `_brand.css`

| Famille               | Teinte       | RGB (500)     |
| --------------------- | ------------ | ------------- |
| `--brand-primary-*`   | Orange       | `249,115,22`  |
| `--brand-secondary-*` | Violet prune | `168,85,247`  |
| `--brand-accent-*`    | Slate        | `100,116,139` |

Chaque famille expose les palettes `50` → `900` et une variable `*-500-rgb` pour les usages `rgba()`.

```css
background: var(--brand-primary-500);
background: rgba(var(--brand-primary-500-rgb), 0.15);
```

### Neutral — `_neutral.css`

Palette de gris `--neutral-50` → `--neutral-900`, utilisée par les thèmes pour les tokens de texte et de bordure.

### Status — `_status.css`

| Famille       | Teinte  | Usage sémantique                     |
| ------------- | ------- | ------------------------------------ |
| `--success-*` | Emerald | Validation, état positif             |
| `--danger-*`  | Red     | Erreur, suppression, état critique   |
| `--warning-*` | Amber   | Avertissement, attention requise     |
| `--info-*`    | Blue    | Information, état neutre             |
| `--muted-*`   | Stone   | Éléments désactivés, contenu atténué |

Chaque famille expose `50` → `900` et `*-500-rgb`.

```css
background: var(--success-100);
color: var(--success-700);
background: rgba(var(--danger-500-rgb), 0.1);
```

### Surface — `_surface.css`

Palettes dédiées aux fonds de l'interface. Ces tokens **peuvent être consommés directement** dans les composants.

#### Aliases rapides

| Token                | Valeur                      | Usage                       |
| -------------------- | --------------------------- | --------------------------- |
| `--surface-page`     | `var(--neutral-50)`         | Fond de page                |
| `--surface-base`     | `rgb(255, 255, 255)`        | Fond de carte / contenu     |
| `--surface-elevated` | `rgb(249, 236, 206)`        | Fond surélevé (chaud/crème) |

Les deux familles (`--surface-base-*` et `--surface-elevated-*`) exposent `50` → `900`.

```css
background: var(--surface-page);       /* Fond de page */
background: var(--surface-base);       /* Card standard */
background: var(--surface-elevated);   /* Card mise en avant */
background: var(--surface-base-100);   /* Nuance précise */
border-color: var(--surface-base-300);
```

---

## 🌗 Thèmes

Appliqués via `data-theme` sur l'élément racine. Redéfinissent les tokens sémantiques en fonction du mode.

```html
<html data-theme="light"> … </html>
<html data-theme="dark">  … </html>
```

Les palettes primitives restent inchangées entre les thèmes. Seuls les tokens sémantiques varient.

### Tokens sémantiques disponibles

| Token              | Description                   |
| ------------------ | ----------------------------- |
| `--text-default`   | Texte principal               |
| `--text-subtle`    | Texte secondaire              |
| `--text-muted`     | Texte désactivé / placeholder |
| `--text-inverted`  | Texte sur fond coloré         |
| `--text-link`      | Liens                         |
| `--border-default` | Bordure standard              |
| `--border-subtle`  | Bordure discrète              |
| `--border-strong`  | Bordure accentuée             |

```css
color: var(--text-default);
border-color: var(--border-default);
```

---

## 🎭 Tones

Palettes sémantiques utilisées par les composants via `data-tone`. Les variables `--tone-*` s'adaptent automatiquement au thème courant.

| Valeur      | Description                                         |
| ----------- | --------------------------------------------------- |
| `primary`   | Action principale, CTA, éléments à forte prominence |
| `secondary` | Action complémentaire, éléments secondaires         |
| `neutral`   | Sans signification sémantique, usage général        |
| `success`   | Validation, état positif                            |
| `danger`    | Erreur, suppression, état critique                  |
| `warning`   | Situation nécessitant l'attention de l'utilisateur  |
| `info`      | Information, état neutre                            |
| `muted`     | Élément désactivé, contenu atténué, placeholder     |

```html
<button data-role="button" data-tone="primary">Enregistrer</button>
<button data-role="button" data-tone="danger">Supprimer</button>
<span   data-role="badge"  data-tone="success">Publié</span>
```

---

## 🧩 Sémantiques

Styles scopés par composant via attributs `data-*`. Aucune classe CSS requise.

| Composant | Attribut de base     | Attributs disponibles                                    | Documentation                                 |
| --------- | -------------------- | -------------------------------------------------------- | --------------------------------------------- |
| 🆕 `Badge`   | `data-role="badge"`  | `data-tone` `data-appearance` `data-variant` `data-size` | [📖 README](./src/semantics/badge/README.md)  |
| 🆕 `Button`  | `data-role="button"` | `data-tone` `data-appearance` `data-variant` `data-size` | [📖 README](./src/semantics/button/README.md) |
| ...       | ...                  | ...                                                      | ...                                           |

> 💡 **Ajoutez vos composants sémantiques ici au fur et à mesure**

### Attributs communs

| Attribut          | Valeurs possibles                                                            |
| ----------------- | ---------------------------------------------------------------------------- |
| `data-tone`       | `primary` `secondary` `neutral` `success` `danger` `warning` `info` `muted` |
| `data-appearance` | `filled` `outline` `ghost` `subtle`                                          |
| `data-size`       | `xs` `sm` `md` `lg` `xl`                                                     |

### Exemple complet

```html
<!-- Badge -->
<span
  data-role="badge"
  data-tone="success"
  data-appearance="subtle"
  data-size="sm"
>
  Publié
</span>

<!-- Button -->
<button
  data-role="button"
  data-tone="primary"
  data-appearance="filled"
  data-size="md"
>
  Enregistrer
</button>
```

---

## 🚀 Développement

### Ajouter un nouveau token

1. Créez ou éditez le fichier concerné dans `src/tokens/`
2. Exportez-le via `src/tokens/index.css`
3. Documentez-le dans ce README

### Ajouter un nouveau thème

1. Créez le fichier dans `src/themes/mon-theme.css`
2. Définissez les tokens sémantiques en référençant les primitifs
3. Appliquez-le via `data-theme="mon-theme"`

### Ajouter un style sémantique

1. Créez le dossier dans `src/semantics/mon-composant/`
2. Ajoutez les styles scopés via `data-role="mon-composant"`
3. Documentez les attributs disponibles dans ce README

---

## 🤝 Conventions

### Naming

- **Tokens primitifs** : `--{famille}-{teinte}` (`--brand-primary-500`, `--neutral-200`)
- **Tokens sémantiques** : `--{usage}-{variante}` (`--text-default`, `--border-subtle`)
- **Aliases surface** : `--surface-{niveau}` (`--surface-page`, `--surface-base`)
- **Tones** : `--tone-{propriété}` (`--tone-bg`, `--tone-text`)

### Règles d'usage

```css
/* ✅ Bon — token sémantique */
color: var(--text-default);

/* ✅ Bon — alias surface */
background: var(--surface-base);

/* ❌ Éviter — primitif consommé directement dans un composant */
color: var(--neutral-900);
```

### Documentation

- Documentez chaque nouveau token dans ce README
- Ajoutez des exemples d'usage CSS dans les commentaires des fichiers
- Mettez à jour les tableaux lors de l'ajout de nouveaux exports

---

## 📄 Licence

<p align="center">
  <img src="../../images/sebprod.png" alt="Seb-Prod Logo" width="120" />
</p>

<p align="center">Propriétaire — © 2026 Seb-Prod</p>