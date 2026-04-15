const execGit = require("../core/execGit");

/**
 * Pousse la branche courante vers le remote Git.
 *
 * Sélectionne automatiquement la commande push adaptée selon le contexte :
 * - **Pas d'upstream** : `git push --set-upstream <remote> <branch>`
 * - **Force demandé** : `git push --force-with-lease <remote> <branch>`
 *   (préféré à `--force` : vérifie que personne n'a pushé entre-temps)
 * - **Cas standard** : `git push <remote> <branch>`
 *
 * @param {object}  cli              - Instance CLI exposant `safeExec`, `log` et `pushError`
 * @param {string}  gitRoot          - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 * @param {string}  branch           - Nom de la branche à pousser
 * @param {string}  [remote="origin"] - Nom du remote cible (défaut : `"origin"`)
 * @param {boolean} [force=false]    - Si `true`, utilise `--force-with-lease` (ex: après un squash)
 *
 * @returns {void}
 *
 * @example
 * // Push standard
 * pushBranch(cli, "/home/user/my-repo", "feature/login");
 *
 * @example
 * // Force push après un squash
 * pushBranch(cli, "/home/user/my-repo", "feature/login", "origin", true);
 */
function pushBranch(cli, gitRoot, branch, remote = "origin", force = false) {
  try {
    // Vérifie si la branche a déjà un upstream configuré
    let hasUpstream = true;
    try {
      execGit(cli, `git rev-parse --abbrev-ref ${branch}@{upstream}`, {
        cwd: gitRoot,
      });
    } catch {
      hasUpstream = false;
    }

    // Sélectionne la commande push adaptée au contexte
    const pushCmd = (() => {
      if (!hasUpstream) {
        // Première fois que cette branche est poussée : on définit l'upstream
        return `git push --set-upstream ${remote} ${branch}`;
      }

      if (force) {
        // Force push sécurisé : échoue si le remote a été modifié entre-temps
        return `git push --force-with-lease ${remote} ${branch}`;
      }

      // Push standard
      return `git push ${remote} ${branch}`;
    })();

    // Exécute le push avec stdio hérité pour afficher la progression Git en temps réel
    const result = execGit(cli, pushCmd, {
      cwd: gitRoot,
      stdio: "inherit",
      errorMessage: "Failed to push branch",
    });

    // En mode stdio inherit, result est null — on vérifie l'absence d'erreur fatale
    if (!cli.hasFatalError) {
      cli.log(`🚀 Branch pushed: ${branch} → ${remote}`);
    }
  } catch (err) {
    cli.pushError(`Push failed: ${err.message}`, true);
  }
}

module.exports = pushBranch;