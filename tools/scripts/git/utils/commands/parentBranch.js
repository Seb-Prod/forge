const execGit = require("../core/execGit");

/**
 * Détermine la branche parente probable d'une branche donnée
 *
 * ⚠️ Heuristique basée sur le merge-base le plus récent
 *
 * @param {object} cli
 * @param {string} gitRoot
 * @param {string} currentBranch
 * @returns {string|null}
 */
function getParentBranch(cli, gitRoot, currentBranch) {
  try {
    // 1. Récupérer toutes les branches locales
    const branchesRaw = execGit(cli, "git for-each-ref --format='%(refname:short)' refs/heads/", {
      cwd: gitRoot,
    });

    const branches = branchesRaw
      .split("\n")
      .map((b) => b.trim())
      .filter((b) => b && b !== currentBranch);

    if (branches.length === 0) {
      cli.log("⚠️ No other branches found");
      return null;
    }

    let bestBranch = null;
    let bestTimestamp = 0;

    // 2. Comparer chaque branche
    for (const branch of branches) {
      try {
        const mergeBase = execGit(
          cli,
          `git merge-base ${currentBranch} ${branch}`,
          { cwd: gitRoot },
        );

        if (!mergeBase) continue;

        // 3. Récupérer la date du commit commun
        const timestamp = parseInt(
          execGit(cli, `git show -s --format=%ct ${mergeBase}`, {
            cwd: gitRoot,
          }),
          10,
        );

        if (timestamp > bestTimestamp) {
          bestTimestamp = timestamp;
          bestBranch = branch;
        }
      } catch (err) {
        // Ignore erreurs sur branches
        continue;
      }
    }

    if (!bestBranch) {
      cli.log("⚠️ Parent branch not found");
      return null;
    }

    return bestBranch;
  } catch (err) {
    cli.pushError("Failed to resolve parent branch", false);
    return null;
  }
}

module.exports = getParentBranch;