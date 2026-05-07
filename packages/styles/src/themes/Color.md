# Guide des couleurs — Thème Forge

## Échelle de tons

Chaque couleur est déclinée de `50` (très clair) à `950` (très foncé), avec `0` = transparent.

| Stop | Rôle |
|---|---|
| `0` | Transparent |
| `50` | Quasi blanc teinté |
| `100–200` | Fonds clairs, surfaces light |
| `300–400` | Tons intermédiaires |
| `500` | Couleur de base |
| `600–700` | Hover, active |
| `800–900` | Fonds sombres |
| `950` | Fond de page dark, muted extrême |

---

## Couleurs sémantiques

| Token | Hex base (`500`) | Usage |
|---|---|---|
| `primary` | `#edac4b` | Actions principales, CTA, accent |
| `secondary` | `#4799d5` | Actions secondaires, liens |
| `success` | `#10b981` | Confirmation, validation |
| `danger` | `#ef4444` | Erreur, destructif |
| `warning` | `#f59e0b` | Avertissement |
| `info` | `#0ea5e9` | Information, aide |
| `neutral` | `#424242` | Textes, bordures, surfaces |

---

## Surfaces

Les surfaces utilisent les tokens `--surface-*` et non les couleurs sémantiques, sauf pour les composants d'état.

| Token | Dark | Light | Usage |
|---|---|---|---|
| `--surface-none` | `transparent` | `transparent` | Pas de fond |
| `--surface-base` | `surface-900` → `#1a1a1a` | `surface-50` → `#f5f5f5` | Fond de page |
| `--surface-raised` | `surface-800` → `#242424` | `surface-100` → `#e0e0e0` | Card, panel |
| `--surface-overlay` | `surface-700` → `#2f2f2f` | `surface-200` → `#c2c2c2` | Modal, popover |
| `--surface-muted` | `surface-950` → `#0f0f0f` | `surface-100` à 60% | Zone atténuée, sidebar |
| `--surface-inverted` | `surface-50` → `#f5f5f5` | `surface-900` → `#1a1a1a` | Fond contrasté |

### Surfaces sémantiques (état)

Pour les alertes, badges et toasts, utiliser directement les stops de couleur :

| Composant | Dark | Light |
|---|---|---|
| Fond success | `success-900` | `success-50` |
| Fond danger | `danger-900` | `danger-50` |
| Fond warning | `warning-900` | `warning-50` |
| Fond info | `info-900` | `info-50` |

---

## Texte

Utiliser les tokens `--text-*` plutôt que les stops bruts.

| Token | Dark | Light | Usage |
|---|---|---|---|
| `--text-primary` | `neutral-50` → `#f5f5f5` | `neutral-900` → `#1a1a1a` | Titres, corps principal |
| `--text-secondary` | `neutral-200` → `#c2c2c2` | `neutral-700` → `#2f2f2f` | Sous-titres, descriptions |
| `--text-muted` | `neutral-400` → `#858585` | `neutral-500` → `#424242` | Labels, placeholders |
| `--text-disabled` | `neutral-600` → `#3b3b3b` | `neutral-300` → `#a3a3a3` | Éléments désactivés |
| `--text-inverted` | `neutral-900` → `#1a1a1a` | `neutral-50` → `#f5f5f5` | Texte sur fond inversé |
| `--text-accent` | `primary-400` → `#f3ad4f` | `primary-600` → `#d9963f` | Liens, accent contextuel |
| `--text-accent-alt` | `secondary-300` → `#84bde7` | `secondary-700` → `#356fa0` | Accent secondaire |

> Pour les textes d'état, utiliser directement les stops : `danger-400` (dark) / `danger-600` (light) pour un message d'erreur, etc.

---

## Interactivité

| État | Dark | Light |
|---|---|---|
| Default | `primary-500` → `#edac4b` | `primary-500` → `#edac4b` |
| Hover | `primary-400` → `#f3ad4f` | `primary-600` → `#d9963f` |
| Active / Pressed | `primary-300` → `#f8c36f` | `primary-700` → `#b87d34` |
| Focus ring | `primary-500` à 40% | `primary-500` à 40% |
| Désactivé | `neutral-600` → `#3b3b3b` | `neutral-300` → `#a3a3a3` |

> En dark, le hover va vers les stops **plus clairs** (on remonte). En light, vers les stops **plus foncés** (on descend).

```css
/* Exemple — bouton primary */
background: var(--color-primary-500);
background: var(--color-primary-400); /* hover dark */
background: var(--color-primary-600); /* hover light */
outline: 2px solid color-mix(in srgb, var(--color-primary-500) 40%, transparent); /* focus */
```

---

## Bordures

Utiliser les tokens `--border-*`.

| Token | Dark | Light | Usage |
|---|---|---|---|
| `--border-subtle` | `neutral-800` → `#242424` | `neutral-100` → `#e0e0e0` | Séparateurs, dividers |
| `--border-default` | `neutral-700` → `#2f2f2f` | `neutral-200` → `#c2c2c2` | Inputs, cards |
| `--border-strong` | `neutral-600` → `#3b3b3b` | `neutral-300` → `#a3a3a3` | Composants actifs |
| `--border-focus` | `primary-500` → `#edac4b` | `primary-500` → `#edac4b` | Focus ring |
| `--border-danger` | `danger-500` → `#ef4444` | `danger-500` → `#ef4444` | Input en erreur |
| `--border-success` | `success-600` → `#059669` | `success-600` → `#059669` | Input valide |

---

## Ombres

La couleur d'ombre est définie via `--shadow-color` :

| Thème | Valeur |
|---|---|
| Dark | `surface-950` → `#0f0f0f` |
| Light | `surface-200` → `#c2c2c2` |

```css
box-shadow: 0 2px 8px color-mix(in srgb, var(--shadow-color) 60%, transparent);
```

---

## Règles à respecter

**Ne pas** utiliser le même ton pour la surface et le texte posé dessus.  
**Ne pas** utiliser `opacity` sur l'élément entier — préférer `color-mix()` sur la couleur.  
**Toujours** utiliser les tokens sémantiques (`--text-*`, `--border-*`, `--surface-*`) dans les composants, jamais les stops bruts directement.

```css
/* ✓ */
color: var(--text-primary);
border: 1px solid var(--border-default);

/* ✗ */
color: #f5f5f5;
border: 1px solid #2f2f2f;
```