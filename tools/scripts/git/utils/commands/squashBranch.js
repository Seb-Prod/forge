const execGit = require("../core/execGit");

/**
 * Squash tous les commits d'une branche feature en un seul,
 * en se basant sur le point de divergence avec une branche de référence.
 *
 * L'algorithme en deux étapes :
 * 1. `git merge-base HEAD <baseBranch>` — localise le commit ancêtre commun
 * 2. `git reset --soft <baseCommit>` — replace HEAD sur ce commit en conservant
 *    tous les changements dans le staging area, prêts pour un nouveau commit
 *
 * ⚠️ Cette opération **réécrit l'historique** de la branche courante.
 * Un `push --force-with-lease` sera nécessaire après le squash.
 *
 * @param {object} cli                   - Instance CLI exposant `safeExec` et `log`
 * @param {string} gitRoot               - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 * @param {string} [baseBranch="origin/main"] - Branche de référence pour le calcul du merge-base
 *
 * @returns {void}
 *
 * @example
 * // Squash par rapport à origin/main (défaut)
 * squashBranch(cli, "/home/user/my-repo");
 *
 * @example
 * // Squash par rapport à une autre branche de référence
 * squashBranch(cli, "/home/user/my-repo", "origin/develop");
 */
function squashBranch(cli, gitRoot, baseBranch = "origin/main") {
  try {
    // 1. Localise le commit ancêtre commun entre HEAD et la branche de référence
    const baseCommit = execGit(
      cli,
      `git merge-base HEAD ${baseBranch}`,
      {
        cwd: gitRoot,
        errorMessage: `Failed to find merge-base with "${baseBranch}"`,
      }
    );

    if (!baseCommit) {
      cli.pushError(`No merge-base found with "${baseBranch}"`, false);
      return;
    }

    cli.log(`🔍 Merge-base found: ${baseCommit}`);

    // 2. Reset soft sur le commit de base — conserve tous les changements en staging
    execGit(
      cli,
      `git reset --soft ${baseCommit}`,
      {
        cwd: gitRoot,
        errorMessage: "Failed to reset branch for squash",
      }
    );

    cli.log(`🧹 Branch squashed onto ${baseCommit} (soft reset) — ready to commit`);
  } catch (err) {
    // Une erreur ici peut laisser le repo dans un état intermédiaire
    cli.pushError(`Squash failed: ${err.message}`, false);
  }
}

module.exports = squashBranch;