const execGit = require("../core/execGit");

/**
 * Push la branche courante vers le remote
 *
 * @param {object} cli
 * @param {string} gitRoot
 * @param {string} branch
 * @param {string} remote (default: origin)
 */
function pushBranch(cli, gitRoot, branch, remote = "origin", force = false) {
  try {
    let hasUpstream = true;

    try {
      execGit(cli, `git rev-parse --abbrev-ref ${branch}@{upstream}`, {
        cwd: gitRoot,
      });
    } catch (err) {
      hasUpstream = false;
    }

    // 🔥 FORCE PUSH SAFE (après squash)
    const pushCmd = (() => {
      if (!hasUpstream) {
        return `git push --set-upstream ${remote} ${branch}`;
      }

      if (force) {
        return `git push --force-with-lease ${remote} ${branch}`;
      }

      return `git push ${remote} ${branch}`;
    })();

    execGit(cli, pushCmd, {
      cwd: gitRoot,
      stdio: "inherit",
      errorMessage: "Failed to push branch",
    });

    cli.log(`🚀 Branch pushed: ${branch}`);
  } catch (err) {
    cli.pushError("Push failed", false);
  }
}

module.exports = pushBranch;
