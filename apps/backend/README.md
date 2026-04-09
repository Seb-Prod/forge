# ![logo](../../images/logo.png) Backend - API xxx

![Node.js](https://img.shields.io/badge/Node.js-20-green) ![Express](https://img.shields.io/badge/Express-5-green) ![TypeScript](https://img.shields.io/badge/TypeScript-5-green) ![Sequelize](https://img.shields.io/badge/Sequelize-6-blue)


Backend RESTful pour l'application **XXX**, construit avec **Node.js**, **Express 6**, et **TypeScript 5**.

---

## ⚠️ Important — Monorepo

Ce projet fait partie d’un **monorepo pnpm**.

👉 Toutes les commandes doivent être exécutées **depuis la racine du dépôt**, et non depuis `apps/backend`.

⚠️ Les scripts de développement sont centralisés dans l'application **Forge**, qui permet de :  

![Application Forge](../../images/forge.png)

- centraliser le lancement des services  
- gérer les scripts globaux  
- simplifier le workflow développeur  

Le workspace gère également :  
- les dépendances partagées  
- les packages internes (`@workspace/functions`, etc.)  
- les scripts globaux  

---

## 📋 Vue d'ensemble

Ce backend expose les endpoints nécessaires pour l’application frontend :  

- Gestion des utilisateurs (authentification, profil, rôles)  
- Gestion des données métier (ex: produits, lieux, événements…)  
- Communication avec la base de données SQL / PostgreSQL / MySQL  
- Sécurité, validation, et gestion des erreurs  

C’est un **service central** orchestré par l’application **Forge** dans le monorepo.

---

**Technologies** :
- ⚛️ Node.js
- 📘 TypeScript
- 📦 Packages workspace (`@workspace/functions`)

---

## 🚀 Démarrage rapide

Depuis la racine du monorepo :

```bash
pnpm install   # Installer les dépendances
pnpm dev       # Lancer le serveur de développement
```

L’application sera disponible à l’adresse :
👉 http://localhost:5173


---

## 📁 Structure du projet

```
apps/backend/
├── src/
│   ├── controllers/      # Logique des endpoints
│   ├── services/         # Services métier
│   ├── models/           # Modèles / ORM
│   ├── routes/           # Définition des routes API
│   ├── middlewares/      # Middleware Express
│   ├── utils/            # Fonctions utilitaires
│   ├── types/            # Types TypeScript
│   ├── config/           # Configurations (DB, env)
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── README.md
```

---

## 🧠 Architecture

- `Controllers/` → endpoints REST
- `Services/` → logique métier
- `Models/` → ORM / gestion base de données
- `Middlewares/` → authentification, validation,logging
- `Utils / Types` → fonctions et types réutilisbles

---
## 🎯 API

Les endpoints sont organisés par domaine (exemples):

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| `/api/users` | GET | Liste des utilisateurs |
| `/api/users/:id` | GET | Détails utilisateur |
| `/api/auth/login` | POST | Connexion utilisateur |
| `/api/auth/register` | POST | Inscription utilisateur |

> Pour la documentation complète de l'PI, voir : [📖 Documentation API](../../docs/api.md)

---
## 🌍 Variables d'environnement

### Fichier `.env`
Créer un fichier `.env.development` dans `apps/backend` :

```env
# Configuration de l'environnement
NODE_ENV=development

# --- BACKEND (Ports et Adresses) ---
PORT=8000
BACKEND_ADDRESS=http://localhost:8000

# --- FRONTEND (Ports et Adresses) ---
FRONTEND_PORT=5175
FRONTEND_ADDRESS=http://localhost:5175

# --- MYSQL (Ports et Adresses) ---
MYSQL_PORT=3306
MYSQL_ADDRESS=http://localhost:3306

# --- PHPMYADMIN (Ports et Adresses) ---
PHPMYADMIN_PORT=8081
PHPMYADMIN_ADDRESS=http://localhost:8081

# --- Configuration MySQL (Docker) ---
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=menu_zen2
DB_PORT=3306
```

---
## 📚 Ressources

### Documentation officielle
- [Node.js](https://nodejs.org/fr)
- [Express](https://expressjs.com)
- [TypeScript](https://www.typescriptlang.org/)

### Guides internes
- [Guide des fonctions](../../packages/functions/README.md)
- [Architecture du monorepo](../../docs/architecture.md)
- [Conventions de code](../../docs/coding-standards.md)

---

## 🤝 Contribution

Pour contribuer au frontend :

1. Créer une branche `feature/backend-*`
2. Suivre les conventions de nommage des fichiers et fonctions
3. Mettre à jour cette documentation si nécessaire

---

## ✅ Checklist de qualité

Avant de commiter :

- [ ] Types TypeScript corrects
- [ ] Pas de `console.log` oubliés
- [ ] Variables d'env documentées
- [ ] Endpoints correctement testés

---

**Dernière mise à jour** : Janvier 2026  
**Mainteneur** : Seb-Prod