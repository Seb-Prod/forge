const execGit = require("../core/execGit");

/**
 * Synchronise les références distantes via `git fetch --prune`.
 *
 * L'option `--prune` supprime automatiquement les refs locales
 * qui n'existent plus sur le remote (branches supprimées côté serveur).
 *
 * Cette opération est considérée comme **non bloquante** : un échec réseau
 * (mode offline, remote inaccessible) est signalé mais ne stoppe pas le pipeline.
 *
 * @param {object} cli     - Instance CLI exposant `safeExec`, `log` et `pushError`
 * @param {string} gitRoot - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 *
 * @returns {void}
 *
 * @example
 * fetchRemote(cli, "/home/user/my-repo");
 */
function fetchRemote(cli, gitRoot) {
  // Synchronise les refs distantes et nettoie les branches supprimées sur le remote
  const result = execGit(cli, "git fetch --prune", {
    cwd: gitRoot,
    errorMessage: "git fetch failed (offline?), continuing...",
  });

  // Le fetch peut échouer silencieusement (réseau indisponible) :
  // on ne confirme la sync que si execGit n'a pas retourné d'erreur
  if (result !== null && result !== undefined) {
    cli.log("🔄 Remote refs synced");
  }
}

module.exports = fetchRemote;