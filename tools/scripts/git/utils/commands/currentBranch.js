const execGit = require("../core/execGit");

/**
 * Récupère le nom de la branche Git actuellement active.
 *
 * Si le dépôt se trouve en état "detached HEAD" (HEAD non attaché à une branche),
 * une erreur non fatale est enregistrée via le CLI et la valeur `"HEAD"` est retournée.
 *
 * @param {object} cli      - Instance CLI exposant `log(msg)` et `pushError(msg, fatal)`
 * @param {string} gitRoot  - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 *
 * @returns {string} Nom de la branche courante (ex: `"main"`),
 *                   ou `"HEAD"` si le dépôt est en état detached HEAD,
 *                   ou la valeur retournée par `execGit` en cas d'erreur.
 *
 * @example
 * const branch = getCurrentBranch(cli, "/home/user/my-repo");
 * // → "main"
 */
function getCurrentBranch(cli, gitRoot) {
  // Récupère la référence symbolique courante (nom de branche ou "HEAD" si detached)
  const branch = execGit(cli, "git rev-parse --abbrev-ref HEAD", {
    cwd: gitRoot,
    errorMessage: "Failed to get branch",
  });

  // "HEAD" indique un état detached : aucune branche n'est active
  if (branch === "HEAD") {
    cli.pushError("Detached HEAD");
  }

  cli.log(`🌿 Current Branch: ${branch}`);

  return branch;
}

module.exports = getCurrentBranch;