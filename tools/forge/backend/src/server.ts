import express from 'express';
import cors from 'cors';
import actionRoutes from './routes/action.routes';
import shutdownRoutes from './routes/shutdown.routes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', actionRoutes);
app.use('/api', shutdownRoutes);

// Démarrage du serveur
const server = app.listen(PORT, () => {
  console.log(`🔥 Forge Backend running on http://localhost:${PORT}`);
});

// Gestion propre de l'arrêt
const shutdown = async () => {
  console.log('Shutting down gracefully...');
  
  // Arrêter tous les processus gérés
  const { actionManager } = await import('./services/action-manager');
  await actionManager.stopAll();
  
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);