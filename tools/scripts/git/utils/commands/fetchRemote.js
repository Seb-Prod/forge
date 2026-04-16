const execGit = require("../core/execGit");

/**
 * Synchronise les références distantes via `git fetch --prune`.
 *
 * L'option `--prune` supprime automatiquement les refs locales
 * qui n'existent plus sur le remote (branches supprimées côté serveur).
 *
 * Cette opération est **non bloquante** : en cas d'échec (ex: offline),
 * une erreur est remontée mais le pipeline peut continuer.
 *
 * @param {object} cli     - Instance CLI exposant `log`, `pushError`
 * @param {string} gitRoot - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 *
 * @returns {{
 *   success: boolean,
 *   fetched: boolean,
 *   error?: string
 * }} Résultat du fetch :
 *   - `success` : `true` si la commande a réussi
 *   - `fetched` : `true` si le fetch a été exécuté avec succès
 *   - `error`   : message d'erreur en cas d'échec (non bloquant)
 *
 * @example
 * const result = fetchRemote(cli, "/repo");
 * if (!result.success) {
 *   console.warn(result.error); // non bloquant
 * }
 */
function fetchRemote(cli, gitRoot) {
  try {
    const result = execGit(cli, "git fetch --prune", {
      cwd: gitRoot,
      errorMessage: "git fetch failed (offline?), continuing...",
    });

    // Sécurité : execGit peut retourner null/undefined selon ton implémentation
    if (result === null || result === undefined) {
      const errorMsg = "Failed to fetch remote (offline?)";

      cli.pushError(errorMsg, false);

      return {
        success: false,
        fetched: false,
        error: errorMsg,
      };
    }

    cli.log("🔄 Remote refs synced");

    return {
      success: true,
      fetched: true,
    };
  } catch (err) {
    const errorMsg = err.message;

    cli.pushError(`Fetch failed: ${errorMsg}`, false); // non bloquant

    return {
      success: false,
      fetched: false,
      error: errorMsg,
    };
  }
}

module.exports = fetchRemote;