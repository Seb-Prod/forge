const execGit = require("../core/execGit");

/**
 * Résout le hash HEAD d'une branche locale
 */
function resolveHeadForBranch(cli, gitRoot, branch) {
  return execGit(
    cli,
    `git rev-parse "refs/heads/${branch}"`,
    {
      cwd: gitRoot,
      errorMessage: `Could not resolve head for branch: ${branch}`,
    },
  );
}

module.exports = resolveHeadForBranch;