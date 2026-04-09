import { Router, Request, Response } from 'express';
import { actionManager } from '../services/action-manager';

const router = Router();

interface ActionParams {
  actionId: string;
}

/**
 * GET /api/actions - Liste toutes les actions disponibles
 */
router.get('/actions', async (req: Request, res: Response) => {
  const actions = await actionManager.getAllActions();
  res.json({ actions });
});

/**
 * GET /api/actions/category/:category - Actions par catégorie
 */
router.get('/actions/category/:category', async (req: Request, res: Response) => {
  const category = req.params.category as 'dev' | 'tools' | 'generator';
  
  if (!['dev', 'tools', 'generator'].includes(category)) {
    return res.status(400).json({ error: 'Invalid category' });
  }
  
  const actions = await actionManager.getActionsByCategory(category);
  res.json({ actions });
});

/**
 * GET /api/actions/:actionId - Obtenir le status d'une action spécifique
 */
router.get('/actions/:actionId', async (req: Request<ActionParams>, res: Response) => {
  const { actionId } = req.params;
  const action = await actionManager.getActionStatus(actionId);
  
  if (!action) {
    return res.status(404).json({ error: `Action ${actionId} not found` });
  }
  
  res.json(action);
});

/**
 * POST /api/actions/:actionId/start - Démarre une action
 */
router.post('/actions/:actionId/start', async (req: Request<ActionParams>, res: Response) => {
  const { actionId } = req.params;
  const { args = [] } = req.body;
  
  const result = await actionManager.startAction(actionId, args);
  
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

/**
 * POST /api/actions/:actionId/stop - Arrête une action
 */
router.post('/actions/:actionId/stop', async (req: Request<ActionParams>, res: Response) => {
  const { actionId } = req.params;
  
  const result = await actionManager.stopAction(actionId);
  
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

/**
 * POST /api/actions/:actionId/run - Exécute une action courte et retourne son output
 */
router.post('/actions/:actionId/run', async (req: Request<ActionParams>, res: Response) => {
  const { actionId } = req.params;
  const { args = [] } = req.body;

  const result = await actionManager.runAction(actionId, args);

  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

/**
 * POST /api/actions/:actionId/restart - Redémarre une action
 */
router.post('/actions/:actionId/restart', async (req: Request<ActionParams>, res: Response) => {
  const { actionId } = req.params;
  const { args = [] } = req.body;
  
  await actionManager.stopAction(actionId);
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const result = await actionManager.startAction(actionId, args);
  
  if (result.success) {
    res.json(result);
  } else {
    res.status(400).json(result);
  }
});

export default router;