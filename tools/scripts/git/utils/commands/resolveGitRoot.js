const execGit = require("../core/execGit");

/**
 * Résout le chemin absolu de la racine du dépôt Git
 * à partir d'un répertoire de travail donné.
 *
 * Utilise `git rev-parse --show-toplevel` qui remonte l'arborescence
 * jusqu'à trouver un dossier `.git`. Échoue si `cwd` n'appartient
 * à aucun dépôt Git.
 *
 * @param {object} cli    - Instance CLI exposant `safeExec` et `log`
 * @param {string} cwd    - Chemin du répertoire de départ pour la recherche
 *
 * @returns {string} Chemin absolu de la racine du dépôt Git
 *                   (ex: `"/home/user/my-repo"`)
 *
 * @example
 * const gitRoot = resolveGitRoot(cli, process.cwd());
 * // → "/home/user/my-repo"
 */
function resolveGitRoot(cli, cwd) {
  // Remonte l'arborescence depuis cwd pour localiser la racine du dépôt Git
  const gitRoot = execGit(cli, "git rev-parse --show-toplevel", {
    cwd,
    errorMessage: "Not a git repository",
  });

  cli.log(`📁 Git root resolved: ${gitRoot}`);

  return gitRoot;
}

module.exports = resolveGitRoot;