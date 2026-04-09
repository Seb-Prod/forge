import { Router, Request, Response } from 'express';

const router = Router();

/**
 * POST /api/shutdown - Arrête Forge proprement
 */
router.post('/shutdown', async (req: Request, res: Response) => {
  console.log('🛑 Shutdown requested from web interface');
  
  // Envoyer la réponse avant de shutdown
  res.json({ 
    success: true, 
    message: 'Forge is shutting down...' 
  });

  // Importer et arrêter tous les services
  const { actionManager } = await import('../services/action-manager');
  
  // Donner le temps à la réponse d'être envoyée
  setTimeout(async () => {
    console.log('👋 Stopping all services...');
    await actionManager.stopAll();
    
    console.log('👋 Goodbye!');
    
    // Forcer la fermeture
    process.exit(0);
  }, 500);
});

export default router;