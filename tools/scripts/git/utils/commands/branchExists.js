const execGit = require("../core/execGit");

/**
 * Vérifie si une branche Git existe localement ou sur le remote.
 *
 * La vérification se fait via `git branch --list <branchName>` pour le local
 * et `git ls-remote --heads origin <branchName>` pour le remote.
 *
 * Cette opération est **non bloquante** : en cas d'échec, une erreur est
 * remontée mais le pipeline peut continuer.
 *
 * @param {object} cli        - Instance CLI exposant `log`, `pushError`
 * @param {string} gitRoot    - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 * @param {string} branchName - Nom de la branche à vérifier
 *
 * @returns {{
 *   success: boolean,
 *   exists: boolean,
 *   local: boolean,
 *   remote: boolean,
 *   error?: string
 * }} Résultat de la vérification :
 *   - `success` : `true` si la commande a pu s'exécuter
 *   - `exists`  : `true` si la branche existe (local ou remote)
 *   - `local`   : `true` si la branche existe localement
 *   - `remote`  : `true` si la branche existe sur le remote
 *   - `error`   : message d'erreur en cas d'échec (non bloquant)
 *
 * @example
 * const result = branchExists(cli, "/repo", "feature/my-branch");
 * if (!result.success) {
 *   console.warn(result.error); // non bloquant
 * }
 * if (result.exists) {
 *   console.log(`local: ${result.local}, remote: ${result.remote}`);
 * }
 */
function branchExists(cli, gitRoot, branchName) {
  if (!branchName || typeof branchName !== "string" || !branchName.trim()) {
    const errorMsg = "branchName must be a non-empty string";

    cli.pushError(errorMsg, false);

    return {
      success: false,
      exists: false,
      local: false,
      remote: false,
      error: errorMsg,
    };
  }

  try {
    // --- Vérification locale ---
    const localResult = execGit(
      cli,
      `git branch --list ${branchName}`,
      {
        cwd: gitRoot,
        errorMessage: `Failed to check local branch "${branchName}"`,
      }
    );

    if (localResult === null || localResult === undefined) {
      const errorMsg = `Failed to check local branch "${branchName}"`;

      cli.pushError(errorMsg, false);

      return {
        success: false,
        exists: false,
        local: false,
        remote: false,
        error: errorMsg,
      };
    }

    const existsLocally = localResult.trim().length > 0;

    // --- Vérification remote ---
    const remoteResult = execGit(
      cli,
      `git ls-remote --heads origin ${branchName}`,
      {
        cwd: gitRoot,
        errorMessage: `Failed to check remote branch "${branchName}" (offline?)`,
      }
    );

    if (remoteResult === null || remoteResult === undefined) {
      const errorMsg = `Failed to check remote branch "${branchName}" (offline?)`;

      cli.pushError(errorMsg, false);

      return {
        success: false,
        exists: false,
        local: false,
        remote: false,
        error: errorMsg,
      };
    }

    const existsRemotely = remoteResult.trim().length > 0;
    const exists = existsLocally || existsRemotely;

    cli.log(
      `🔍 Branch "${branchName}": local=${existsLocally}, remote=${existsRemotely}`
    );

    return {
      success: true,
      exists,
      local: existsLocally,
      remote: existsRemotely,
    };
  } catch (err) {
    const errorMsg = err.message;

    cli.pushError(`Branch check failed: ${errorMsg}`, false); // non bloquant

    return {
      success: false,
      exists: false,
      local: false,
      remote: false,
      error: errorMsg,
    };
  }
}

module.exports = branchExists;