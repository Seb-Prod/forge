const execGit = require("../core/execGit");

/**
 * Résout le hash du commit HEAD d'une branche locale.
 *
 * Utilise le chemin de ref complet `refs/heads/<branch>` plutôt que
 * le nom nu de la branche, ce qui évite toute ambiguïté avec des tags
 * ou des refs distantes portant le même nom.
 *
 * @param {object} cli     - Instance CLI exposant `safeExec` et `log`
 * @param {string} gitRoot - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 * @param {string} branch  - Nom de la branche locale à résoudre
 *
 * @returns {string} Hash SHA-1 complet du commit HEAD de la branche
 *                   (ex: `"a1b2c3d4e5f6..."`)
 *
 * @example
 * const hash = resolveHeadForBranch(cli, "/home/user/my-repo", "main");
 * // → "a1b2c3d4e5f67890abcdef1234567890abcdef12"
 */
function resolveHeadForBranch(cli, gitRoot, branch) {
  // Résout le hash via la ref complète pour éviter toute ambiguïté avec tags ou remotes
  const hash = execGit(
    cli,
    `git rev-parse refs/heads/${branch}`,
    {
      cwd: gitRoot,
      errorMessage: `Could not resolve head for branch: ${branch}`,
    },
  );

  cli.log(`🔍 HEAD resolved for "${branch}": ${hash}`);

  return hash;
}

module.exports = resolveHeadForBranch;