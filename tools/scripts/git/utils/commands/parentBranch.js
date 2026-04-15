const execGit = require("../core/execGit");

/**
 * Détermine la branche parente probable d'une branche donnée.
 *
 * L'algorithme repose sur une heuristique de merge-base :
 * pour chaque branche locale (hors `currentBranch`), on calcule le commit
 * ancêtre commun via `git merge-base`, puis on récupère son timestamp Unix.
 * La branche dont le merge-base est le **plus récent** est considérée comme parente.
 *
 * Cette approche est fiable pour les workflows classiques (feature branches)
 * mais peut donner des résultats inattendus sur des historiques complexes
 * (rebases, merges croisés, branches orphelines).
 *
 * @param {object} cli            - Instance CLI exposant `safeExec`, `log` et `pushError`
 * @param {string} gitRoot        - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 * @param {string} currentBranch  - Nom de la branche dont on cherche le parent
 *
 * @returns {string|null} Nom de la branche parente probable,
 *                        ou `null` si aucune branche candidate n'est trouvée
 *
 * @example
 * const parent = getParentBranch(cli, "/home/user/my-repo", "feature/login");
 * // → "main"
 */
function getParentBranch(cli, gitRoot, currentBranch) {
  try {
    // 1. Récupérer toutes les branches locales sauf la branche courante
    const branchesRaw = execGit(
      cli,
      "git for-each-ref --format='%(refname:short)' refs/heads/",
      { cwd: gitRoot },
    );

    const branches = branchesRaw
      .split("\n")
      .map((b) => b.trim())
      .filter((b) => b && b !== currentBranch);

    if (branches.length === 0) {
      cli.pushError("No other branches found to determine parent", false);
      return null;
    }

    let bestBranch = null;
    let bestTimestamp = 0;

    // 2. Pour chaque branche candidate, calculer le merge-base avec la branche courante
    for (const branch of branches) {
      try {
        const mergeBase = execGit(
          cli,
          `git merge-base ${currentBranch} ${branch}`,
          { cwd: gitRoot },
        );

        if (!mergeBase) continue;

        // 3. Récupérer le timestamp Unix du commit ancêtre commun
        const raw = execGit(cli, `git show -s --format=%ct ${mergeBase}`, {
          cwd: gitRoot,
        });

        const timestamp = parseInt(raw, 10);

        // Ignorer les timestamps invalides (NaN) pour ne pas fausser la comparaison
        if (isNaN(timestamp)) continue;

        if (timestamp > bestTimestamp) {
          bestTimestamp = timestamp;
          bestBranch = branch;
        }
      } catch (err) {
        // Erreur isolée sur cette branche (ex: merge-base impossible) — on continue
        cli.log(`⚠️ Skipped branch "${branch}": ${err.message}`);
        continue;
      }
    }

    if (!bestBranch) {
      cli.pushError("Parent branch not found via merge-base heuristic", false);
      return null;
    }

    cli.log(`✅ Parent branch resolved: ${bestBranch}`);
    return bestBranch;
  } catch (err) {
    // Erreur fatale inattendue (ex: échec du listing des branches)
    cli.pushError(`Failed to resolve parent branch: ${err.message}`, false);
    return null;
  }
}

module.exports = getParentBranch;