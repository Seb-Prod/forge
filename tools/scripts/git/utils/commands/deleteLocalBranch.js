const execGit = require("../core/execGit");

/**
 * Supprime une branche Git locale via `git branch -d`.
 *
 * @param {object} cli        - Instance CLI exposant `log`, `pushError`
 * @param {string} gitRoot    - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 * @param {string} branchName - Nom de la branche à supprimer
 * @param {boolean} [force=false] - Force la suppression même si la branche n'est pas mergée (`-D`)
 *
 * @returns {{
 *   success: boolean,
 *   deleted: boolean,
 *   error?: string
 * }} Résultat de la suppression :
 *   - `success` : `true` si la commande a réussi
 *   - `deleted` : `true` si la branche a été supprimée
 *   - `error`   : message d'erreur en cas d'échec (ex: branche inexistante ou non mergée)
 *
 * @example
 * const result = deleteBranch(cli, "/home/user/my-repo", "feature/my-branch", true);
 * if (!result.success) {
 *   console.error(result.error);
 * }
 */
function deleteBranch(cli, gitRoot, branchName, force = false) {
  try {
    const param = force ? "D" : "d";

    execGit(cli, `git branch -${param} ${branchName}`, {
      cwd: gitRoot,
      stdio: "inherit",
      errorMessage: `Failed to delete local branch "${branchName}"`,
    });

    cli.log(
      `🌿 Branch "${branchName}" deleted locally (${force ? "forced" : "safe"})`,
    );

    return {
      success: true,
      deleted: true,
    };
  } catch (err) {
    const errorMsg = err.message;

    cli.pushError(`Delete failed: ${errorMsg}`, false);

    return {
      success: false,
      deleted: false,
      error: errorMsg,
    };
  }
}

module.exports = deleteBranch;
