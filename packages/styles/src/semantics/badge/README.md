# Badge

<p align="center">
  🏷️ Étiquettes • Statuts • Indicateurs
</p>

<p align="center">
  <img src="https://img.shields.io/badge/data--role-badge-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Scope-data--*-blue?style=for-the-badge" />
</p>

<p align="center">
  Composant badge scopé via attributs <code>data-*</code> — aucune classe CSS requise.
</p>

---

## 📋 Vue d'ensemble

Tous les styles sont scopés à `[data-role="badge"]`. Les attributs `data-tone`, `data-appearance`, `data-variant` et `data-size` sont indépendants et combinables librement.

### Exemple complet

```html
<span
  data-role="badge"
  data-tone="success"
  data-appearance="soft"
  data-variant="pill"
  data-size="md"
>
  Publié
</span>
```

---

## 🎛️ Attributs

### `data-role`

Requis pour que les styles s'appliquent.

| Valeur    | Description                |
| --------- | -------------------------- |
| `"badge"` | Active les styles du badge |

---

### `data-tone`

Définit la palette de couleurs via les variables `--tone-*`.

| Valeur        | Description                                                     |
| ------------- | --------------------------------------------------------------- |
| `"primary"`   | Couleur principale pour les composants importants               |
| `"secondary"` | Couleur secondaire pour les composants complémentaires          |
| `"neutral"`   | Couleur neutre par défaut sans signification sémantique         |
| `"success"`   | Indique une validation réussie                                  |
| `"danger"`    | Indique une erreur ou une validation échouée                    |
| `"warning"`   | Indique une situation nécessitant l'attention de l'utilisateur  |
| `"info"`      | Fournit une information ou un état neutre à l'utilisateur       |

---

### `data-appearance`

Contrôle le style visuel du badge.

| Valeur      | Description                        |
| ----------- | ---------------------------------- |
| `"filled"`  | Fond plein                         |
| `"soft"`    | Fond légèrement coloré             |
| `"outline"` | Bordure visible, fond transparent  |

Variables CSS internes définies par `data-appearance` :

| Variable   | Description           |
| ---------- | --------------------- |
| `--bg`     | Couleur de fond       |
| `--color`  | Couleur du texte      |
| `--border` | Couleur de la bordure |

---

### `data-variant`

Définit la forme et le comportement du badge.

| Valeur        | Description                                          |
| ------------- | ---------------------------------------------------- |
| `"default"`   | Badge standard sans style particulier                |
| `"dot"`       | Badge avec point indicateur pour signaler un statut  |
| `"pill"`      | Badge arrondi en forme de capsule                    |
| `"removable"` | Badge avec bouton de suppression intégré             |

Variables CSS internes définies par `data-variant` :

| Variable          | Description                                                     |
| ----------------- | --------------------------------------------------------------- |
| `--border-radius` | Rayon de bordure. Seul `"pill"` modifie cette valeur (`999px`)  |

---

### `data-size`

Définit la taille du badge.

| Valeur | Description      |
| ------ | ---------------- |
| `"sm"` | Petit badge      |
| `"md"` | Taille standard  |
| `"lg"` | Grand badge      |

Variables CSS internes définies par `data-size` :

| Variable          | Description                    |
| ----------------- | ------------------------------ |
| `--height`        | Hauteur totale du badge        |
| `--dot-size`      | Taille du point indicateur     |
| `--icon-size`     | Taille des icônes intégrées    |
| `--font-size`     | Taille de la police            |
| `--border-radius` | Rayon de bordure               |

> 💡 `data-variant="pill"` surcharge `--border-radius` avec `999px`, quelle que soit la taille définie.

---

## 📄 Licence

<p align="center">
  <img src="../../../../../images/sebprod.png" alt="Seb-Prod Logo" width="120" />
</p>

<p align="center">Propriétaire — © 2026 Seb-Prod</p>