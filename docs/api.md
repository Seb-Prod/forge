# 📡 API Documentation

Documentation officielle de l'API backend.

---

## 🌍 Base URL

### Développement
http://localhost:8000

### Procution
https://api.xxx.com

---

## 🔐 Authentification

L’API utilise une authentification par token.

### Header requis :
```http
Authorization: Bearer <token>
```
---
### 📌 Codes HTTP

| Code | Signification |
|------|---------------|
| 200 | OK |
| 201 | Created |
| 400 | Bad request |
| 401 | Unauthorized |
| 404 | Not found |
| 500 | Server error |

--- 
### 🔄 Versioning

| Version | Description |
|---------|-------------|
| v1 | Version actuelle |

