const { execSync } = require("child_process");

/**
 * Exécute une commande Git de façon standardisée via le CLI.
 *
 * Délègue l'exécution à `cli.safeExec` pour une gestion d'erreur centralisée.
 * En mode `stdio: "inherit"`, la sortie est redirigée vers le terminal
 * et aucune valeur n'est retournée (retour `null` attendu et normal).
 *
 * @param {object} cli                   - Instance CLI exposant `safeExec(fn, errorMessage)`
 * @param {string} cmd                   - Commande Git complète à exécuter (ex: `"git status"`)
 * @param {object} [options={}]          - Options d'exécution
 * @param {string} [options.cwd]         - Répertoire de travail (racine du dépôt Git)
 * @param {string} [options.stdio]       - Mode stdio passé à `execSync` (défaut: `"pipe"`)
 * @param {string} [options.errorMessage] - Message d'erreur personnalisé si la commande échoue
 *
 * @returns {string | null} Sortie stdout nettoyée (trim),
 *                          ou `null` si `stdio` est `"inherit"` ou en cas d'erreur gérée
 *
 * @example
 * // Récupérer la branche courante
 * const branch = execGit(cli, "git rev-parse --abbrev-ref HEAD", { cwd: gitRoot });
 *
 * @example
 * // Commit avec sortie héritée (retourne null, comportement normal)
 * execGit(cli, 'git commit -m "feat: init"', { cwd: gitRoot, stdio: "inherit" });
 */
function execGit(cli, cmd, options = {}) {
  const isInheritMode = options.stdio === "inherit";

  // Exécute la commande via safeExec pour centraliser la gestion des erreurs
  const res = cli.safeExec(
    () => {
      const out = execSync(cmd, {
        encoding: "utf-8",
        stdio: options.stdio || "pipe",
        cwd: options.cwd,
        maxBuffer: 1024 * 1024 * 10, // 10 MB — évite les crashes sur les gros diffs
      });

      // En mode "inherit", execSync redirige vers le terminal et retourne null
      return (out ?? "").toString().trim();
    },
    options.errorMessage || "Git command failed",
  );

  // En mode "inherit", null est un retour normal (pas d'erreur)
  if (!isInheritMode && (res === null || res === undefined)) {
    throw new Error(`Git command returned empty result: ${cmd}`);
  }

  return res;
}

module.exports = execGit;