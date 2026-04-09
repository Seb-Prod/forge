# UI Kit - Roadmap et Arborescence

Ce document sert de **roadmap pour la création de tous les composants** de l'application et fournit l'arborescence recommandée pour `ui/`. Chaque composant contient :

- 🔹 Priorité : Haute / Moyenne / Basse
- ✅ Case à cocher pour suivi de création
- 📁 Structure standard pour chaque type de composant
- ⚡ Notes sur usage ou template

---

## Arborescence recommandée pour `ui/`

```
ui/
  src/
    components/
      primitives/
      branding/
      composites/
      patterns/
    layouts/
    contexts/
    hooks/
    functions/
    pages/
    types/
```

---

## 1️⃣ Primitives (briques de base)

| Composant      | Priorité | Créé | Refactorisé | Doc | Demo |
| -------------- | -------- | ---- | ----------- | --- | ---- |
| Badge          | Haute    | [x]  | [x]         | [ ] | [x]  |
| Button         | Haute    | [x]  | [x]         | [ ] | [x]  |
| IconButton     | Haute    | [x]  | [x]         | [ ] | [x]  |
| Switch         | Moyenne  | [ ]  | [ ]         | [ ] | [ ]  |
| Checkbox       | Moyenne  | [x]  | [x]         | [ ] | [x]  |
| Radio          | Moyenne  | [ ]  | [ ]         | [ ] | [ ]  |
| Input          | Haute    | [x]  | [ ]         | [ ] | [ ]  |
| Textarea       | Moyenne  | [ ]  | [ ]         | [ ] | [ ]  |
| Select         | Moyenne  | [x]  | [ ]         | [ ] | [ ]  |
| Text           | Haute    | [X]  | [ ]         | [ ] | [ ]  |
| Title          | Haute    | [x]  | [ ]         | [ ] | [ ]  |
| Stack / Row    | Haute    | [ ]  | [ ]         | [ ] | [ ]  |
| Spacer         | Moyenne  | [ ]  | [ ]         | [ ] | [ ]  |
| Divider        | Moyenne  | [ ]  | [ ]         | [ ] | [ ]  |
| Icon           | Haute    | [ ]  | [ ]         | [ ] | [ ]  |
| Tag            | Moyenne  | [ ]  | [ ]         | [ ] | [ ]  |
| VisuallyHidden | Basse    | [ ]  | [ ]         | [ ] | [ ]  |

### 📁 Template de dossier pour primitive

```
components/
  primitives/
    Button/
      Button.tsx
      Button.module.css
      Button.types.ts
      Button.demo.tsx
      index.ts
```

---

## 2️⃣ Composants composés

| Composant        | Priorité | Créé |
| ---------------- | -------- | ---- |
| ActionButtons    | Haute    | [ ]  |
| Modal            | Haute    | [ ]  |
| Dialog           | Haute    | [ ]  |
| Tooltip          | Moyenne  | [ ]  |
| Dropdown         | Moyenne  | [ ]  |
| Accordion        | Moyenne  | [ ]  |
| Tabs             | Moyenne  | [ ]  |
| Alert            | Moyenne  | [ ]  |
| Loader / Spinner | Moyenne  | [ ]  |
| Avatar           | Moyenne  | [ ]  |
| Card             | Haute    | [ ]  |

### 📁 Template de dossier pour composant composé

```
components/
  Dialog/
    components/   # sous-composants internes (DialogHeader, DialogFooter)
    context/      # context interne au Dialog
    hooks/        # hooks spécifiques
    Dialog.tsx
    Dialog.module.css
    Dialog.demo.tsx
    index.ts
```

---

## 3️⃣ Branding / App spécifique

| Composant     | Priorité | Créé |
| ------------- | -------- | ---- |
| Logo          | Haute    | [ ]  |
| AppIcon       | Moyenne  | [ ]  |
| ThemeSwitcher | Moyenne  | [ ]  |

### 📁 Template pour branding

```
components/
  Logo/
    Logo.tsx
    Logo.module.css
    Logo.demo.tsx
    index.ts
```

---

## 4️⃣ Layouts

| Composant       | Priorité | Créé |
| --------------- | -------- | ---- |
| Navbar / Header | Haute    | [ ]  |
| Sidebar         | Moyenne  | [ ]  |
| Footer          | Moyenne  | [ ]  |
| PageLayout      | Haute    | [ ]  |
| AppLayout       | Haute    | [ ]  |
| Panel           | Moyenne  | [ ]  |
| Grid            | Moyenne  | [ ]  |
| Container       | Moyenne  | [ ]  |

### 📁 Template pour layout complexe

```
layouts/
  Navbar/
    components/   # sous-composants internes (NavItem, NavDropdown)
    hooks/        # hooks pour gestion du menu
    Navbar.tsx
    Navbar.module.css
    Navbar.demo.tsx
    index.ts
```

---

## 5️⃣ Patterns UX / Composants métier

| Composant             | Priorité | Créé |
| --------------------- | -------- | ---- |
| ConfirmDialog         | Haute    | [ ]  |
| DeleteConfirm         | Moyenne  | [ ]  |
| EmptyState            | Moyenne  | [ ]  |
| Pagination            | Moyenne  | [ ]  |
| Breadcrumb            | Basse    | [ ]  |
| Notifications / Toast | Haute    | [ ]  |
| Form                  | Haute    | [ ]  |
| SearchBar             | Moyenne  | [ ]  |
| FilterPanel           | Moyenne  | [ ]  |
| Table                 | Haute    | [ ]  |
| ListItem              | Moyenne  | [ ]  |
| Carousel              | Basse    | [ ]  |

### 📁 Template pour composant UX complexe

```
components/
  ConfirmDialog/
    components/   # boutons, header, footer internes
    context/      # context interne au dialog
    hooks/        # hooks pour focus / open state
    ConfirmDialog.tsx
    ConfirmDialog.module.css
    ConfirmDialog.demo.tsx
    index.ts
```

---

## 6️⃣ Utilitaires UI

| Composant      | Priorité | Créé |
| -------------- | -------- | ---- |
| Portal         | Moyenne  | [ ]  |
| FocusTrap      | Moyenne  | [ ]  |
| ScrollArea     | Moyenne  | [ ]  |
| ResizablePanel | Basse    | [ ]  |
| Skeleton       | Moyenne  | [ ]  |

---

### ⚡ Notes générales

- **Primitives** → simple, dossier unique
- **Composés / UX / Layouts** → prévoir sous-dossiers `components`, `context`, `hooks` si nécessaire
- **Demos** → chaque composant doit avoir son `.demo.tsx` pour visualiser et tester
- **forwardRef** → utilisé sur toutes les primitives qui rendent un élément HTML focusable ou mesurable (`Button`, `Title`, `Input`, `Logo`)

---

> ✅ Cette roadmap peut être utilisée pour **suivi de création** et **standardisation de ton UI kit**.
