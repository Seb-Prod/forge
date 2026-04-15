const execGit = require("../core/execGit");

/**
 * Récupère le nom de la branche Git actuellement active.
 *
 * ⚠️ Si le dépôt est en état "detached HEAD",
 * une alerte est remontée via le CLI.
 *
 * @param {string} gitRoot - Chemin absolu du dépôt Git
 * @returns {string | null}
 * Nom de la branche courante ou `null` en cas d'échec.
 */
function getCurrentBranch(cli, gitRoot) {
  const branch = execGit(cli, "git rev-parse --abbrev-ref HEAD", {
    cwd: gitRoot,
    errorMessage: "Failed to get branch",
  });

  if (branch === "HEAD") {
    cli.log("⚠️ Detached HEAD");
    cli.pushError("Detached HEAD", false);
  }

  return branch;
}

module.exports = getCurrentBranch;
