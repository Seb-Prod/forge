# ➕ Ajouter un nouveau script

## 📝 Étapes

### 1. Ajouter l'action dans `action-manager.ts`

```typescript
// tools/forge/backend/src/services/action-manager.ts

export const AVAILABLE_ACTIONS: Action[] = [
  // ... actions existantes
  
  {
    id: 'mon-action',                    // ID unique
    name: 'Mon Action',                  // Nom affiché
    description: 'Description courte',   // Description
    category: 'dev',                     // 'dev' | 'tools' | 'generator'
    script: 'mon-script.js',            // Nom du fichier
    allowMultiple: false                 // true/false
  }
];
```

### 2. Créer le script dans `/scripts`

```javascript
#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Mon script démarre...');

// Votre code ici

process.exit(0);
```

### 3. Rendre exécutable

```bash
chmod +x scripts/mon-script.js
```

### 4. Tester

```bash
node scripts/mon-script.js
```

## 🎯 Catégories

| Catégorie | Usage | Page |
|-----------|-------|------|
| `dev` | Services (frontend, backend, db) | Development |
| `tools` | Utilitaires (VSCode, browser) | Tools |
| `generator` | Créer du code (composants, routes) | Generators |

## 💡 allowMultiple

- `false` → Une seule instance (ex: backend)
- `true` → Plusieurs instances OK (ex: VSCode)

## ✅ C'est tout !

Redémarrez Forge et votre action apparaîtra automatiquement.