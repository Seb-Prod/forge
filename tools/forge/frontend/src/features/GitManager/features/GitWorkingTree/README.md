<p align="center">
  <img src="/images/forge.png" alt="Forge" width="160" />
</p>

<h1 align="center">Forge Documentation</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/License-MIT-brightgreen?style=for-the-badge" />

## </p>

# GitWorkingTree

GitWorkingTree est un composant UI permettant de visualiser et sélectionner les fichiers Git modifiés avant de préparer le commit.

## Pourquoi ?

Identifier et sélectionner les bons fichiers avant un commit peut vite devenir fastidieux sur un projet avec de nombreuses modifications en cours.

GitWorkingTree apporte :

- une visualisation des fichiers modifiés sous forme d'arborescence ou de liste
- une sélection fine fichier par fichier ou groupée par statut
- une intégration directe avec la modale de commit

## Expérience utilisateur

- Les actions principales sont regroupées en haut du panneau pour un accès rapide
- Le rafraîchissement automatique garantit des données toujours à jour
- Un indicateur de temps informe l'utilisateur du prochain rafraîchissement

## Aperçu

### Vue arborescence

<p align="center">
  <img src="./docs/preview-tree.png" width="800"/>
</p>

### Vue liste

<p align="center">
  <img src="./docs/preview-list.png" width="800"/>
</p>

## Responsabilités

- Bascule entre une vue arborescence (`GitTreeView`) et une vue liste (`GitListView`)
- Sélection individuelle de chaque fichier via checkbox
- Sélection groupée par statut Git via `GitStatusFilter`
- Construction de l'arborescence de fichiers via `buildTree`
- Ouverture de la modale de commit avec les fichiers sélectionnés en payload
- Affichage d'un état vide (`EmptyState`) quand aucune modification n'est détectée
- Affichage d’un header avec rafraîchissement manuel et automatique des données
- Affichage du temps restant avant le prochain rafraîchissement
- Regroupement des actions utilisateur (changement de vue, préparation du commit)

---

## Arborescence

GitWorkingTree/
├── GitWorkingTree.tsx # Composant racine
├── hooks/
│ └── useFileSelection.ts # Gestion de la sélection des fichiers
├── utils/
│ └── buildTree.ts # Construction de l'arborescence Git
├── types/
│ └── TreeNodeItem.types.ts # Types Git partagés
├── utils/
│ └── buildTree.ts #
├── constants/
│ └── statusConfig.ts #
└── components/
├── EmptyState/ # Affiché quand aucune modification n'est détectée
├── GitStatusFilter/ # Sélection groupée par statut Git
├── GitTreeView/ # Vue arborescence
├── TreeFileItem.tsx # Nœud fichier
├── TreeFolderItem.tsx # Nœud dossier dépliable
├── GitListView/ # Vue liste à plat
├── GitWorkingTreeHeader/ # Header avec titre, refresh et timer
├── GitWorkingTreeContent/ # Zone d'affichage des fichiers (arbre, liste, empty)
└── GitWorkingTreeActions/ # Toggle vue + bouton commit

---

## Composants

### `GitWorkingTree`

Point d'entrée de la feature. Orchestre les vues, la sélection et l'ouverture de la modale de commit.

Consomme :

- `useGitRepository()` — données Git et état des modifications
- `useGitModal()` — ouverture de la modale de commit
- `useFileSelection()` — gestion de l'état de sélection

---

### `GitWorkingTreeHeader`

Header du panneau de sélection. Regroupe les informations globales et les actions liées au rafraîchissement des données.

Responsabilités :

- Affiche le titre “Sélectionner les fichiers”
- Affiche le temps restant avant le prochain rafraîchissement automatique
- Permet de déclencher un rafraîchissement manuel des données

---

### `GitWorkingTreeActions`

Regroupe les actions principales liées à la sélection et au commit.

Responsabilités :

- Permet de basculer entre la vue arborescence et la vue liste
- Affiche le bouton de préparation du commit
- Déclenche l’ouverture de la modale de commit avec les fichiers sélectionnés
- Indique le nombre de fichiers sélectionnés

| Prop            | Type             | Description                                            |
| --------------- | ---------------- | ------------------------------------------------------ |
| `view`          | `View`           | Vue active — `"tree"` ou `"list"`                      |
| `onViewChange`  | `(view) => void` | Callback de changement de vue                          |
| `selectedFiles` | `SelectedFiles`  | Fichiers sélectionnés transmis au payload de la modale |
| `selectedCount` | `number`         | Nombre total de fichiers sélectionnés                  |

---

### `GitWorkingTreeContent`

Zone d'affichage des fichiers Git modifiés.

Responsabilités :

- Bascule entre `GitTreeView` et `GitListView` selon la vue active
- Affiche `EmptyState` quand aucune modification n'est détectée
- Délègue la sélection individuelle des fichiers via `toggleCheck`

| Prop          | Type                      | Description                                    |
| ------------- | ------------------------- | ---------------------------------------------- |
| `view`        | `View`                    | Vue active — `"tree"` ou `"list"`              |
| `tree`        | `TreeNode[]`              | Arborescence construite par `buildTree`        |
| `checked`     | `Record<string, boolean>` | État de sélection indexé par chemin            |
| `toggleCheck` | `(path: string) => void`  | Callback de sélection individuelle             |

---

### `GitTreeView`

Affiche les fichiers modifiés sous forme d'arborescence récursive interactive.

Adapte les `GitTreeNode` au format `TreeNodeData` du package `@workspace/ui` via `toTreeNodeData`, puis délègue le rendu à `TreeFileItem` et `TreeFolderItem`.

| Prop            | Type                      | Description                             |
| --------------- | ------------------------- | --------------------------------------- |
| `tree`          | `GitTreeNode[]`           | Arborescence construite par `buildTree` |
| `checked`       | `Record<string, boolean>` | État de sélection indexé par chemin     |
| `onToggleCheck` | `(path: string) => void`  | Callback de sélection individuelle      |

---

### `GitListView`

Affiche les fichiers modifiés sous forme de liste à plat.

Aplatit récursivement l'arborescence via `flattenTree` et affiche le chemin complet de chaque fichier avec son statut.

| Prop            | Type                      | Description                             |
| --------------- | ------------------------- | --------------------------------------- |
| `tree`          | `GitTreeNode[]`           | Arborescence construite par `buildTree` |
| `checked`       | `Record<string, boolean>` | État de sélection indexé par chemin     |
| `onToggleCheck` | `(path: string) => void`  | Callback de sélection individuelle      |

---

### `TreeFileItem`

Nœud fichier de l'arborescence Git. Affiche le nom du fichier coloré selon son statut, un badge et une checkbox de sélection.

| Prop            | Type                      | Description                         |
| --------------- | ------------------------- | ----------------------------------- |
| `node`          | `FileNode`                | Nœud de type fichier                |
| `checked`       | `Record<string, boolean>` | État de sélection indexé par chemin |
| `onToggleCheck` | `(path: string) => void`  | Callback de sélection               |

**Statuts supportés :**

| `node.status` | Couleur   | Badge     |
| ------------- | --------- | --------- |
| `"modified"`  | `warning` | Modifié   |
| `"deleted"`   | `danger`  | Supprimé  |
| `"untracked"` | `success` | Non suivi |

---

### `TreeFolderItem`

Nœud dossier dépliable de l'arborescence Git. Expose une checkbox uniquement pour les dossiers `untracked` — Git ne tracke pas les dossiers modifiés ou supprimés en tant qu'entité.

| Prop            | Type                      | Description                                 |
| --------------- | ------------------------- | ------------------------------------------- |
| `node`          | `FolderNode`              | Nœud de type dossier                        |
| `checked`       | `Record<string, boolean>` | État de sélection indexé par chemin         |
| `onToggleCheck` | `(path: string) => void`  | Callback de sélection                       |
| `open`          | `boolean`                 | État d'ouverture, contrôlé par `TreeView`   |
| `onToggle`      | `() => void`              | Callback toggle, fourni par `TreeView`      |
| `children`      | `ReactNode`               | Enfants rendus récursivement par `TreeView` |

---

### `GitStatusFilter`

Sélection groupée de fichiers par statut Git. Affiche trois checkboxes (Modifiés / Supprimés / Non suivis) avec un compteur `sélectionnés/total` pour chaque statut.

| Prop                  | Type                                        | Description                         |
| --------------------- | ------------------------------------------- | ----------------------------------- |
| `checked`             | `Record<string, boolean>`                   | État de sélection indexé par chemin |
| `onToggleAllByStatus` | `(paths: string[], value: boolean) => void` | Callback de sélection groupée       |

**Comportement des checkboxes :**

| État                           | Visuel       |
| ------------------------------ | ------------ |
| Aucun fichier disponible       | Désactivée   |
| Aucun fichier sélectionné      | Décochée     |
| Certains fichiers sélectionnés | Indéterminée |
| Tous les fichiers sélectionnés | Cochée       |

---

## Hook

### `useFileSelection`

Gère l'état de sélection des fichiers et construit l'arborescence.

| Retour              | Type                      | Description                              |
| ------------------- | ------------------------- | ---------------------------------------- |
| `checked`           | `Record<string, boolean>` | État de sélection indexé par chemin      |
| `toggleCheck`       | `(path) => void`          | Sélectionne / désélectionne un fichier   |
| `toggleAllByStatus` | `(paths, value) => void`  | Sélectionne / désélectionne un groupe    |
| `selectedFiles`     | `SelectedFiles`           | Fichiers sélectionnés groupés par statut |
| `selectedCount`     | `number`                  | Nombre total de fichiers sélectionnés    |
| `tree`              | `GitTreeNode[]`           | Arborescence construite depuis `gitData` |

---

## Utilitaire

### `buildTree`

Construit une arborescence `GitTreeNode[]` depuis des listes de chemins groupées par statut.

Fonctionne en deux passes : insertion dans un `Record` intermédiaire, puis normalisation récursive avec propagation du statut aux dossiers parents.

**Propagation du statut des dossiers :**

| Enfants          | Statut du dossier |
| ---------------- | ----------------- |
| Tous `untracked` | `"untracked"`     |
| Tous `deleted`   | `"deleted"`       |
| Mixte            | `"modified"`      |

---

## Dépendances internes

| Import             | Provenance                          |
| ------------------ | ----------------------------------- |
| `useGitRepository` | `GitManager/context`                |
| `useGitModal`      | `GitManager/context`                |
| `SelectedFiles`    | `GitManager/context/GitModal`       |
| `STATUS_CONFIG`    | `GitManager/constants/statusConfig` |
| `GitStatus`        | `GitManager/types`                  |

## Dépendances externes

| Import                                                      | Provenance      |
| ----------------------------------------------------------- | --------------- |
| `TreeView`, `TreeNodeData`, `AutoRefreshIndicator`          | `@workspace/ui` |
| `Box`, `Button`, `Text`, `Badge`, `Checkbox`, `ToggleGroup` | `@workspace/ui` |
| `useLocalStorage`                                           | `@workspace/ui/hooks` |
| `react-icons`                                               | `bi`, `fa`      |

---

## Modale déclenchée

| Clé      | Déclencheur                 | Payload                         |
| -------- | --------------------------- | ------------------------------- |
| `commit` | Bouton "Préparer le commit" | `{ branchName, selectedFiles }` |

---

## 📚 Documentation

Cette documentation fait partie de l'écosystème Forge.

👉 Voir la documentation complète : [Forge Documentation](../README.md)

---

## 📄 Licence

<p align="center">
  <img src="/images/sebprod.png" alt="Seb-Prod Logo" width="120" />
</p>

<p align="center">
  <strong>© 2026 Sébastien Drillaud (Seb-Prod)</strong><br/>
  Ce projet est sous licence MIT.
</p>

<p align="center">
  <a href="https://github.com/Seb-Prod">
    <img src="/images/GitHub_Lockup_Black.png" alt="GitHub Logo" width="120" />
  </a>
  <a href="https://www.linkedin.com/in/sébastien-drillaud-b68b3318a/">
    <img src="/images/LI-Logo.png" alt="LinkedIn Logo" width="120" />
  </a>
</p>
