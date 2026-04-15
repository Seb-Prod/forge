const execGit = require("../core/execGit");

/**
 * Vérifie si le working tree est propre (aucune modification)
 *
 * @param {object} cli
 * @param {string} gitRoot
 * @returns {boolean}
 */
function isWorkingTreeClean(cli, gitRoot) {
  try {
    const status = execGit(
      cli,
      "git status --porcelain",
      { cwd: gitRoot }
    );

    if (status.length > 0) {
      cli.log("⚠️ Uncommitted changes detected");
      cli.pushError("Working directory is not clean", false);
      return false;
    }

    return true;
  } catch (err) {
    cli.pushError("Failed to check working tree", false);
    return false;
  }
}

module.exports = isWorkingTreeClean;