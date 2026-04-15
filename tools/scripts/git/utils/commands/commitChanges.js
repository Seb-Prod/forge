const execGit = require("../core/execGit");

/**
 * Crée un commit avec les fichiers actuellement stagés.
 *
 * ✔ Vérifie qu'il y a bien des changements avant de commit.
 * ⚠️ Lève une erreur si aucun changement n'est détecté.
 *
 * @param {string} gitRoot - Racine du dépôt Git
 * @param {string} commitMessage - Message du commit
 *
 * @throws {Error} Si aucun changement n'est stagé ou si le commit échoue
 */
function commitChanges(cli, gitRoot, message) {
  const hasChanges = execGit(cli, "git diff --cached --name-only", {
    cwd: gitRoot,
  });

  if (!hasChanges.trim()) {
    cli.log("⚠️ No staged changes");
    throw new Error("Nothing to commit");
  }

  execGit(cli, `git commit -m ${JSON.stringify(message)}`, {
    cwd: gitRoot,
    stdio: "inherit",
  });

  cli.log("✅ Commit created");
}

module.exports = commitChanges;
