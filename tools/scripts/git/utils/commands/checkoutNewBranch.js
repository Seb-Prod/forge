const execGit = require("../core/execGit");

/**
 * Crée une nouvelle branche Git et bascule dessus via `git checkout -b`.
 *
 * @param {object} cli        - Instance CLI exposant `log`, `pushError`
 * @param {string} gitRoot    - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 * @param {string} branchName - Nom de la branche à créer
 *
 * @returns {{
 *   success: boolean,
 *   created: boolean,
 *   error?: string
 * }} Résultat du checkout :
 *   - `success` : `true` si la branche a été créée et le checkout effectué
 *   - `created` : `true` si la branche a réellement été créée
 *   - `error`   : message d'erreur en cas d'échec (ex: branche déjà existante)
 *
 * @example
 * const result = checkoutNewBranch(cli, "/home/user/my-repo", "feature/my-branch");
 * if (!result.success) {
 *   console.error(result.error);
 * }
 */
function checkoutNewBranch(cli, gitRoot, branchName) {
  try {
    // Crée la branche et bascule dessus
    execGit(cli, `git checkout -b ${branchName}`, {
      cwd: gitRoot,
      stdio: "inherit",
      errorMessage: `Failed to create branch "${branchName}"`,
    });

    cli.log(`🌿 Branch "${branchName}" created and checked out`);

    return {
      success: true,
      created: true,
    };
  } catch (err) {
    const errorMsg = err.message;

    cli.pushError(`Checkout failed: ${errorMsg}`, false);

    return {
      success: false,
      created: false,
      error: errorMsg,
    };
  }
}

module.exports = checkoutNewBranch;