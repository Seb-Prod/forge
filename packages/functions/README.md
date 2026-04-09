# @workspace/functions

<p align="center">
  🛠️ Formatters • Validators • Helpers • Utils
</p>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Workspace-Functions-orange?style=for-the-badge" />
</p>

<p align="center">
  Fonctions utilitaires TypeScript partagées entre toutes les applications du monorepo.
</p>

---

## 📦 Installation

Dans n'importe quel package du monorepo, ajoutez la dépendance :

```json
{
  "dependencies": {
    "@workspace/functions": "workspace:*"
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
packages/functions/
├── src/
│   ├── formatters/     # Mise en forme (dates, nombres, texte…)
│   ├── validators/     # Validation de données
│   ├── helpers/        # Fonctions utilitaires générales
│   └── index.ts        # Point d'entrée principal
├── package.json
├── tsconfig.json
└── README.md
```

### Utilisation

```ts
import { formatDate, validateEmail } from "@workspace/functions";
```

---

## 📅 Formatters

Fonctions de mise en forme pour les données affichées dans l'interface.

| Fonction | Description | Signature |
| -------- | ----------- | --------- |
| ...      | ...         | ...       |

> 💡 **Ajoutez vos formatters ici au fur et à mesure**

---

## ✅ Validators

Fonctions de validation de données (formulaires, API, saisies utilisateur…).

| Fonction | Description | Signature |
| -------- | ----------- | --------- |
| ...      | ...         | ...       |

> 💡 **Ajoutez vos validators ici au fur et à mesure**

---

## 🔧 Helpers

Fonctions utilitaires générales sans catégorie spécifique.

| Fonction | Description | Signature |
| -------- | ----------- | --------- |
| ...      | ...         | ...       |

> 💡 **Ajoutez vos helpers ici au fur et à mesure**

---

## 📝 TypeScript

Tous les exports sont typés avec TypeScript. Les types sont automatiquement inclus.

```ts
import type { FormatDateOptions } from "@workspace/functions";
```

---

## 🚀 Développement

### Ajouter un nouveau formatter

1. Créez le fichier dans `src/formatters/maFonction.ts`
2. Exportez depuis `src/formatters/index.ts`
3. Documentez avec JSDoc
4. Ajoutez-le au tableau ci-dessus

### Ajouter un nouveau validator

1. Créez le fichier dans `src/validators/maFonction.ts`
2. Exportez depuis `src/validators/index.ts`
3. Documentez avec JSDoc
4. Ajoutez-le au tableau ci-dessus

### Ajouter un nouveau helper

1. Créez le fichier dans `src/helpers/maFonction.ts`
2. Exportez depuis `src/helpers/index.ts`
3. Documentez avec JSDoc
4. Ajoutez-le au tableau ci-dessus

---

## 🤝 Conventions

### Naming

- **Fonctions** : camelCase (`formatDate`, `validateEmail`, `slugify`)
- **Types** : PascalCase (`FormatDateOptions`, `ValidatorResult`)
- **Constants** : UPPER_SNAKE_CASE (`DEFAULT_LOCALE`, `DATE_FORMAT`)

### Imports / Exports

Toujours exporter via les fichiers `index.ts` pour une API propre :

```ts
// ✅ Bon
import { formatDate } from "@workspace/functions";

// ❌ Éviter
import { formatDate } from "@workspace/functions/formatters/formatDate";
```

### Documentation

- Documentez chaque fonction avec JSDoc (paramètres, retour, exemple)
- Mettez à jour ce README lors de l'ajout de nouveaux exports

```ts
/**
 * Formate une date en chaîne lisible.
 * @param date - La date à formater
 * @param locale - La locale à utiliser (défaut : "fr-FR")
 * @returns La date formatée
 * @example formatDate(new Date()) // "20 mars 2026"
 */
export function formatDate(date: Date, locale = "fr-FR"): string { … }
```

---

## 📄 Licence

<p align="center">
  <img src="../../images/sebprod.png" alt="Seb-Prod Logo" width="120" />
</p>

<p align="center">Propriétaire — © 2026 Seb-Prod</p>