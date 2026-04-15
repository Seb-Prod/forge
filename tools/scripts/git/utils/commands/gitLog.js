const execGit = require("../core/execGit");

/**
 * Récupère le log Git complet (toutes branches)
 */
function getGitLog(cli, gitRoot) {
  return execGit(
    cli,
    'git log --pretty=format:"%H|%P|%d|%s" --all',
    {
      cwd: gitRoot,
      errorMessage: "Failed to read git log",
    },
  );
}

module.exports = getGitLog;