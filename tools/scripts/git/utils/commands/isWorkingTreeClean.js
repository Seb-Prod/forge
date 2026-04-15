const execGit = require("../core/execGit");

/**
 * Vérifie si le working tree Git est propre (aucune modification non commitée).
 *
 * Utilise `git status --porcelain` dont la sortie est vide si le dépôt est propre,
 * ou contient une ligne par fichier modifié/non tracké dans le cas contraire.
 *
 * Cette vérification est **non bloquante** : les erreurs sont enregistrées
 * via `cli.pushError` avec `fatal = false` et la fonction retourne `false`.
 *
 * @param {object} cli     - Instance CLI exposant `safeExec`, `log` et `pushError`
 * @param {string} gitRoot - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 *
 * @returns {boolean} `true` si le working tree est propre, `false` dans tous les autres cas
 *                    (modifications détectées ou erreur lors de la vérification)
 *
 * @example
 * const clean = isWorkingTreeClean(cli, "/home/user/my-repo");
 * if (!clean) process.exit(1);
 */
function isWorkingTreeClean(cli, gitRoot) {
  try {
    // Récupère l'état du working tree dans un format stable et parseable
    const status = execGit(cli, "git status --porcelain", { cwd: gitRoot });

    // Une sortie non vide indique des fichiers modifiés ou non trackés
    if (status.length > 0) {
      cli.pushError("Working directory is not clean");
      return false;
    }

    cli.log("✅ Working tree is clean");
    return true;
  } catch (err) {
    // Capture les erreurs inattendues d'execGit en préservant le message original
    cli.pushError(`Failed to check working tree: ${err.message}`);
    return false;
  }
}

module.exports = isWorkingTreeClean;