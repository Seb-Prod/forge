import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Trouve la racine du projet en cherchant le package.json racine
 */
export function findProjectRoot(): string {
  // Option 1: Variable d'environnement
  if (process.env.PROJECT_ROOT) {
    return process.env.PROJECT_ROOT;
  }

  // Option 2: Calculer depuis le répertoire actuel
  // Depuis tools/forge/backend/src/config, remonter de 4 niveaux
  const fromConfig = path.resolve(__dirname, '../../../..');
  
  // Option 3: Utiliser process.cwd() qui pointe généralement vers la racine lors de l'exécution
  // Si lancé avec pnpm depuis la racine, cwd sera la racine
  const fromCwd = process.cwd();
  
  // Vérifier si on est dans tools/forge/backend (cwd pointe vers ce dossier)
  if (fromCwd.includes('tools/forge/backend')) {
    return path.resolve(fromCwd, '../../');
  }
  
  // Sinon, utiliser fromConfig
  return fromConfig;
}

export const PROJECT_ROOT = findProjectRoot();
export const SCRIPTS_DIR = path.join(PROJECT_ROOT, 'scripts');

console.log('📍 Project root:', PROJECT_ROOT);
console.log('📁 Scripts directory:', SCRIPTS_DIR);