const { execSync } = require("child_process");
const execGit = require("../core/execGit");

/**
 * Pousse une branche vers un remote Git.
 *
 * Détermine automatiquement la stratégie de push selon le contexte :
 * - **Pas d'upstream** : configure avec `--set-upstream`
 * - **Force activé** : utilise `--force-with-lease` (sécurisé)
 * - **Standard** : push classique
 *
 * Toutes les erreurs sont capturées et retournées sous forme de résultat structuré,
 * sans interrompre brutalement le processus appelant.
 *
 * @param {object}  cli               - Instance CLI exposant `log`, `pushError`
 * @param {string}  gitRoot           - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 * @param {string}  branch            - Nom de la branche à pousser
 * @param {string}  [remote="origin"] - Nom du remote cible
 * @param {boolean} [force=false]     - Si `true`, utilise `--force-with-lease`
 *
 * @returns {{
 *   success: boolean,
 *   pushed: boolean,
 *   strategy?: "upstream" | "force" | "standard",
 *   error?: string
 * }} Résultat du push :
 *   - `success`  : `true` si le push a réussi
 *   - `pushed`   : `true` si une tentative de push a été effectuée avec succès
 *   - `strategy` : stratégie utilisée (`upstream`, `force`, `standard`)
 *   - `error`    : message d'erreur en cas d'échec
 *
 * @example
 * const result = pushBranch(cli, "/repo", "feature/login");
 * if (!result.success) {
 *   console.error(result.error);
 * }
 */
function pushBranch(cli, gitRoot, branch, remote = "origin", force = false) {
  try {
    let hasUpstream = true;

    // Vérifie la présence d'un upstream
    try {
      execSync(`git rev-parse --abbrev-ref ${branch}@{upstream}`, {
        cwd: gitRoot,
        encoding: "utf-8",
        stdio: "pipe",
      });
      hasUpstream = true;
    } catch {
      hasUpstream = false;
    }

    // Détermine la stratégie de push
    let strategy = "standard";
    let pushCmd = "";

    if (!hasUpstream) {
      strategy = "upstream";
      pushCmd = `git push --set-upstream ${remote} ${branch}`;
    } else if (force) {
      strategy = "force";
      pushCmd = `git push --force-with-lease ${remote} ${branch}`;
    } else {
      pushCmd = `git push ${remote} ${branch}`;
    }

    // Exécution du push
    execGit(cli, pushCmd, {
      cwd: gitRoot,
      stdio: "inherit",
      errorMessage: "Failed to push branch",
    });

    cli.log(`🚀 Branch pushed: ${branch} → ${remote}`);

    return {
      success: true,
      pushed: true,
      strategy,
    };
  } catch (err) {
    const errorMsg = err.message;

    cli.pushError(`Push failed: ${errorMsg}`, false);

    return {
      success: false,
      pushed: false,
      error: errorMsg,
    };
  }
}

module.exports = pushBranch;
