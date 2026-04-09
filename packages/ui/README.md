# @workspace/ui

<p align="center">
  ⚛️ Components • Hooks • Contexts • Layouts
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Workspace-UI-orange?style=for-the-badge" />
</p>

<p align="center">
  Bibliothèque de composants, hooks, contextes et utilitaires React partagés entre toutes les applications du monorepo.
</p>

---

## 📦 Installation

Dans n'importe quel package du monorepo, ajoutez la dépendance :

```json
{
  "dependencies": {
    "@workspace/ui": "workspace:*"
  }
}
```

Puis lancez :

```bash
pnpm install
```

---

## 📋 Vue d'ensemble

### Structure

```
packages/ui/
├── src/
│   ├── components/     # Composants React réutilisables
│   ├── constants/      # Constantes
│   ├── contexts/       # Contextes React (DeviceContext, ThemeContext, etc.)
│   ├── features/       # Fonctionnalités
│   ├── functions/      # Fonctions utilitaires
│   ├── hooks/          # Hooks React personnalisés
│   ├── layouts/        # Layouts de page
│   ├── pages/          # Pages par défaut (missing, error…)
│   ├── router/         # Routing
│   ├── utils/          # Utilitaires
│   └── index.ts        # Point d'entrée principal
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🎨 Components

Composants UI réutilisables pour construire vos interfaces.

### Utilisation

```tsx
import { Button, Card, Modal } from "@workspace/ui/components";

function App() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
    </Card>
  );
}
```

### Composants disponibles

| Composant   | Description                                   | Documentation                                             |
| ----------- | --------------------------------------------- | --------------------------------------------------------- |
| 🆕 `Badge`  | Badge pour étiquettes, statuts et indicateurs | JSDoc inline                                              |
| 🆕 `Button` | Bouton avec variantes                         | [📖 README](./src/components/primitives/Button/README.md) |
| 🆕 `Link`   | Lien avec variantes                           | [📖 README](./src/components/primitives/Button/README.md) |
| 🆕 `Switch` | Bouton switch avec variantes                  | JSDoc inline                                              |
| ...         | ...                                           | ...                                                       |

> 💡 **Ajoutez vos composants ici au fur et à mesure**

---

## 🔌 Contexts disponibles

Contextes React pour gérer l'état global et les fonctionnalités partagées.

| Context         | Description                                                        | Documentation                                       |
| --------------- | ------------------------------------------------------------------ | --------------------------------------------------- |
| `DeviceContext` | Détection avancée du type d'appareil, orientation, OS et mode PWA. | [📖 Documentation](./src/contexts/device/README.md) |
| ...             | ...                                                                | ...                                                 |

> 💡 **Ajoutez vos contextes ici au fur et à mesure**

---

## 🪝 Hooks disponibles

Hooks React personnalisés pour des comportements réutilisables.

| Hook | Description | Documentation |
| ---- | ----------- | ------------- |
| ...  | ...         | ...           |

> 💡 **Ajoutez vos hooks ici au fur et à mesure**

---

## 🛠️ Functions disponibles

| Fonction | Description | Signature |
| -------- | ----------- | --------- |
| ...      | ...         | ...       |

> 💡 **Ajoutez vos fonctions utilitaires ici au fur et à mesure**

---

## 🎭 Layouts disponibles

| Layout | Description | Props |
| ------ | ----------- | ----- |
| ...    | ...         | ...   |

> 💡 **Ajoutez vos layouts ici au fur et à mesure**

---

## 📝 TypeScript

Tous les exports sont typés avec TypeScript. Les types sont automatiquement inclus.

```tsx
import type { DeviceType, ButtonProps } from "@workspace/ui";
```

---

## 🚀 Développement

### Ajouter un nouveau composant

1. Créez le dossier dans `src/components/MonComposant/`
2. Ajoutez `MonComposant.tsx` et `index.ts`
3. Exportez depuis `src/components/index.ts`
4. Documentez dans ce README
5. Ajoutez des tests si nécessaire

### Ajouter un nouveau hook

1. Créez le fichier dans `src/hooks/useMonHook.ts`
2. Exportez depuis `src/hooks/index.ts`
3. Documentez avec JSDoc
4. Ajoutez-le au tableau ci-dessus

### Ajouter une nouvelle fonction

1. Créez le fichier dans `src/functions/maFonction.ts`
2. Exportez depuis `src/functions/index.ts`
3. Écrivez des tests unitaires
4. Documentez dans ce README

---

## 🤝 Conventions

### Naming

- **Components** : PascalCase (`Button`, `DataTable`)
- **Hooks** : camelCase avec préfixe `use` (`useDebounce`, `useDevice`)
- **Functions** : camelCase (`formatDate`, `slugify`)
- **Types** : PascalCase (`DeviceType`, `ButtonProps`)
- **Constants** : UPPER_SNAKE_CASE (`MAX_WIDTH`, `API_URL`)

### Imports / Exports

Toujours exporter via les fichiers `index.ts` pour une API propre :

```tsx
// ✅ Bon
import { Button } from "@workspace/ui/components";

// ❌ Éviter
import { Button } from "@workspace/ui/components/Button/Button";
```

### Documentation

- Utilisez JSDoc/TSDoc pour documenter le code
- Ajoutez des exemples dans les commentaires
- Mettez à jour ce README lors de l'ajout de nouveaux exports

---

## 📄 Licence

<p align="center">
  <img src="../../images/sebprod.png" alt="Seb-Prod Logo" width="120" />
</p>

<p align="center">Propriétaire — © 2026 Seb-Prod</p>
