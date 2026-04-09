# Button & Link

<p align="center">
  🖱️ Actions • Navigation • Icônes • États
</p>

<p align="center">
  <img src="https://img.shields.io/badge/data--role-button-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/React_Router-Link-blue?style=for-the-badge&logo=reactrouter" />
  <img src="https://img.shields.io/badge/Scope-data--*-blue?style=for-the-badge" />
</p>

<p align="center">
  Composants <code>Button</code> et <code>Link</code> avec une API unifiée — actions et navigation avec les mêmes props.
</p>

---

## 📋 Vue d'ensemble

Les styles reposent sur un système d'attributs `data-*` (`data-tone`, `data-appearance`, `data-size`…), ce qui permet un découplage complet entre logique et style, une composition flexible des variantes et une meilleure maintenabilité du design system.

### Structure

```
packages/
├── ui/
│   └── src/
│       └── Button/
│           ├── Button.tsx
│           ├── Button.demo.tsx       # Démo interactive
│           ├── Link.tsx
│           ├── Link.demo.tsx         # Démo interactive
│           └── index.ts
└── styles/
    └── src/
        └── semantics/
            └── button/
                ├── index.css
                └── README.md         # Détail des data-* et variables CSS
```

👉 Pour le détail complet des attributs `data-*` et des variables CSS associées, voir :
[📖 README Sémantiques Button](../../../../../styles/src/semantics/button/README.md)

---

## 📦 Installation

```bash
pnpm install @workspace/ui
```

---

## 🚀 Utilisation

### Button

```tsx
import { Button } from "@workspace/ui";

<Button tone="primary" appearance="filled">
  Click me
</Button>
```

### Link

```tsx
import { Link } from "@workspace/ui";

<Link to="/home">Aller à l'accueil</Link>
```

---

## 🎨 Props communes

| Prop          | Type         | Description                         |
| ------------- | ------------ | ----------------------------------- |
| `tone`        | `Tone`       | Couleur sémantique                  |
| `appearance`  | `Appearance` | Style visuel                        |
| `size`        | `Size`       | Taille du composant                 |
| `animation`   | `Animation`  | Animation au survol                 |
| `fullWidth`   | `boolean`    | Prend toute la largeur              |
| `disabled`    | `boolean`    | Désactive le composant              |
| `loading`     | `boolean`    | État de chargement                  |
| `loadingText` | `string`     | Texte affiché pendant le chargement |
| `className`   | `string`     | Classes CSS supplémentaires         |
| `icon`        | `ReactNode`  | Icône seule                         |
| `startIcon`   | `ReactNode`  | Icône avant le texte                |
| `endIcon`     | `ReactNode`  | Icône après le texte                |
| `iconOnly`    | `ReactNode`  | Mode icône uniquement               |
| `children`    | `ReactNode`  | Contenu                             |

### Props spécifiques — Button

| Prop   | Type                              | Description         |
| ------ | --------------------------------- | ------------------- |
| `type` | `"button" \| "submit" \| "reset"` | Type HTML du bouton |

```tsx
<Button type="submit">Envoyer</Button>
```

### Props spécifiques — Link

| Prop | Type     | Description         |
| ---- | -------- | ------------------- |
| `to` | `string` | Route de navigation |

```tsx
<Link to="/dashboard">Dashboard</Link>
```

---

## 🎬 Exemples

### Apparences

```tsx
<Button appearance="filled">Filled</Button>
<Button appearance="outline">Outline</Button>
<Button appearance="ghost">Ghost</Button>
<Button appearance="link">Link</Button>
```

### Tonalités

```tsx
<Button tone="primary">Principal</Button>
<Button tone="success">Succès</Button>
<Button tone="danger">Danger</Button>
```

### Animations

```tsx
<Button animation="left">Hover me</Button>
<Button animation="circle">Hover me</Button>
```

### Icônes

```tsx
<Button startIcon={<PlusIcon />}>Ajouter</Button>
<Button endIcon={<ArrowIcon />}>Suivant</Button>
<Button iconOnly icon={<SettingsIcon />} aria-label="Paramètres" />
```

### États

```tsx
<Button loading loadingText="Envoi en cours...">Envoyer</Button>
<Button disabled>Action désactivée</Button>
```

---

## 🎮 Démo interactive

La démo est accessible depuis **Forge** dans l'onglet **Showcase**, et définie dans :

```
packages/ui/src/Button/Button.demo.tsx
packages/ui/src/Button/Link.demo.tsx
```

Elle permet de visualiser et tester en temps réel toutes les combinaisons de props : apparences, tonalités, tailles, états `loading` / `disabled`, icônes et animations.

---

## ♿ Accessibilité

| Cas        | Comportement                          |
| ---------- | ------------------------------------- |
| `iconOnly` | `aria-label` obligatoire              |
| `loading`  | `aria-busy` géré automatiquement      |
| `disabled` | Toutes les interactions sont bloquées |

---

## 💡 Bonnes pratiques

✅ À faire

```tsx
<Button tone="primary" type="submit">Action principale</Button>
<Link to="/profile">Voir le profil</Link>
<Button iconOnly icon={<DeleteIcon />} aria-label="Supprimer l'élément" />
```

❌ À éviter

```tsx
// aria-label manquant en mode iconOnly
<Button iconOnly icon={<Icon />} />

// Utiliser <Button> pour naviguer — préférer <Link>
<Button onClick={() => navigate("/home")}>Accueil</Button>
```

---

## 📄 Licence

<p align="center">
  <img src="../../../../../../images/sebprod.png" alt="Seb-Prod Logo" width="120" />
</p>

<p align="center">Propriétaire — © 2026 Seb-Prod</p>