const execGit = require("../core/execGit");

/**
 * Crée un commit Git à partir des fichiers actuellement stagés.
 *
 * Vérifie au préalable qu'il existe bien des changements indexés (staged)
 * avant de lancer le commit. En cas d'erreur, le processus est contrôlé
 * et retourne un résultat structuré plutôt que de casser brutalement.
 *
 * @param {object} cli         - Instance CLI exposant `log`, `pushError`
 * @param {string} gitRoot     - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 * @param {string} message     - Message du commit (sera échappé via JSON.stringify)
 *
 * @returns {{
 *   success: boolean,
 *   committed: boolean,
 *   error?: string
 * }} Résultat du commit :
 *   - `success`   : `true` si le commit a été créé avec succès
 *   - `committed` : `true` si un commit a réellement été effectué
 *   - `error`     : message d'erreur en cas d'échec (ex: rien à commit ou erreur Git)
 *
 * @example
 * const result = commitChanges(cli, "/home/user/my-repo", "feat: add login page");
 * if (!result.success) {
 *   console.error(result.error);
 * }
 */
function commitChanges(cli, gitRoot, message) {
  try {
    // Vérifie s'il y a des fichiers stagés
    const stagedFiles = execGit(cli, "git diff --cached --name-only", {
      cwd: gitRoot,
    });

    if (!stagedFiles.trim()) {
      const errorMsg = "Nothing to commit";
      cli.pushError(errorMsg, false);

      return {
        success: false,
        committed: false,
        error: errorMsg,
      };
    }

    // Exécute le commit
    execGit(cli, `git commit -m ${JSON.stringify(message)}`, {
      cwd: gitRoot,
      stdio: "inherit",
      errorMessage: "Failed to create commit",
    });

    cli.log("✅ Commit created");

    return {
      success: true,
      committed: true,
    };
  } catch (err) {
    // Erreur fatale du commit
    const errorMsg = err.message;

    cli.log(`Commit failed: ${errorMsg}`, false);

    return {
      success: false,
      committed: false,
      error: errorMsg,
    };
  }
}

module.exports = commitChanges;