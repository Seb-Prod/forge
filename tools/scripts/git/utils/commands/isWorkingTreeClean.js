const execGit = require("../core/execGit");

/**
 * Vérifie si le working tree Git est propre (aucune modification non commitée).
 *
 * Utilise `git status --porcelain` dont la sortie est vide si le dépôt est propre,
 * ou contient une ligne par fichier modifié/non tracké dans le cas contraire.
 *
 * Cette vérification est **non bloquante** : les erreurs sont enregistrées
 * via `cli.pushError` avec `fatal = false` et la fonction retourne un résultat
 * structuré plutôt que de casser brutalement.
 *
 * @param {object} cli     - Instance CLI exposant `log` et `pushError`
 * @param {string} gitRoot - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 *
 * @returns {{
 *   success: boolean,
 *   clean: boolean,
 *   error?: string
 * }} Résultat de la vérification :
 *   - `success` : `true` si la vérification s'est déroulée sans erreur technique
 *   - `clean`   : `true` si le working tree est propre (aucune modification détectée)
 *   - `error`   : message d'erreur en cas d'échec (ex: modifications détectées ou erreur Git)
 *
 * @example
 * const result = isWorkingTreeClean(cli, "/home/user/my-repo");
 * if (!result.clean) {
 *   console.error(result.error);
 * }
 */
function isWorkingTreeClean(cli, gitRoot) {
  try {
    // Récupère l'état du working tree dans un format stable et parseable
    const status = execGit(cli, "git status --porcelain", { cwd: gitRoot });

    // Une sortie non vide indique des fichiers modifiés ou non trackés
    if (status.length > 0) {
      const errorMsg = "Working directory is not clean";
      cli.pushError(errorMsg, false);

      return {
        success: true,
        clean: false,
        error: errorMsg,
      };
    }

    cli.log("✅ Working tree is clean");

    return {
      success: true,
      clean: true,
    };
  } catch (err) {
    // Capture les erreurs inattendues d'execGit en préservant le message original
    const errorMsg = `Failed to check working tree: ${err.message}`;
    cli.pushError(errorMsg, false);

    return {
      success: false,
      clean: false,
      error: errorMsg,
    };
  }
}

module.exports = isWorkingTreeClean;