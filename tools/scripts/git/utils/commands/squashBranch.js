const execGit = require("../core/execGit");

/**
 * Squash tous les commits d'une branche en un seul
 * basé sur une branche distante (ex: origin/main)
 *
 * ⚠️ Ne fait PAS le commit final (à faire séparément)
 *
 * @param {object} cli
 * @param {string} gitRoot
 * @param {string} baseBranch (ex: origin/main)
 */
function squashBranch(cli, gitRoot, baseBranch = "origin/main") {
  // 1. Trouver le point de divergence (plus fiable que origin/main direct)
  const baseCommit = execGit(
    cli,
    `git merge-base HEAD ${baseBranch}`,
    { cwd: gitRoot }
  );

  // 2. Reset soft → garde les changements staged
  execGit(
    cli,
    `git reset --soft ${baseCommit}`,
    {
      cwd: gitRoot,
      errorMessage: "Failed to squash branch",
    }
  );

  cli.log("🧹 Branch successfully squashed (soft reset)");
}

module.exports = squashBranch;