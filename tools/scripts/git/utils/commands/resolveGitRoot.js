const execGit = require("../core/execGit");

/**
 * Résout le chemin absolu de la racine du dépôt Git
 * à partir d'un répertoire donné.
 *
 * @param {string} cwd - Répertoire courant
 * @returns {string | null}
 * Chemin absolu du dépôt Git ou `null` si le dossier
 * n'est pas un dépôt Git valide.
 */
function resolveGitRoot(cli, cwd) {
  return execGit(cli, "git rev-parse --show-toplevel", {
    cwd,
    errorMessage: "Not a git repository",
  });
}

module.exports = resolveGitRoot;
