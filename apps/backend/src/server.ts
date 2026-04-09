import express, { Request, Response } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config(); // Charge les variables d'environnement

const app = express();
const port = process.env.PORT || 5000; // Utilisation de la variable d'environnement

// Middlewares
app.use(cors());
app.use(express.json());

// Configuration de la connexion MySQL (via Sequelize)
const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Désactive l'affichage des requêtes SQL
  }
);

// Test de la connexion
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la BDD MySQL établie avec succès.');
    // Une fois la BDD connectée, on démarre le serveur
    app.listen(port, () => {
      console.log(`⚡️ Serveur Express démarré sur http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Impossible de se connecter à la base de données:', err);
  });

// Exemple de route
app.get('/', (req: Request, res: Response) => {
  res.send(`API saine. Environnement: ${process.env.NODE_ENV}`);
});