const execGit = require("../core/execGit");

/**
 * Synchronise les refs distantes
 */
function fetchRemote(cli, gitRoot) {
  execGit(cli, "git fetch --prune", {
    cwd: gitRoot,
    errorMessage: "git fetch failed (offline?), continuing...",
  });

  cli.log("🔄 Remote refs synced");
}

module.exports = fetchRemote;