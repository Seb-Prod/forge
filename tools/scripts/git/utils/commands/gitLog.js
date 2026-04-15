const execGit = require("../core/execGit");

/**
 * Récupère le log Git complet de toutes les branches.
 *
 * Chaque ligne du résultat suit le format :
 * `<hash>|<parent(s)>|<decorations>|<subject>`
 *
 * - `%H`  : hash complet du commit
 * - `%P`  : hash(es) du/des parent(s), séparés par un espace
 * - `%d`  : décorations (branches, tags, HEAD)
 * - `%s`  : sujet du commit (première ligne du message)
 *
 * @param {object} cli     - Instance CLI exposant `safeExec` et `log`
 * @param {string} gitRoot - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 *
 * @returns {string} Log Git brut multi-lignes, une entrée par commit,
 *                   ou chaîne vide si le dépôt ne contient aucun commit
 *
 * @example
 * const log = getGitLog(cli, "/home/user/my-repo");
 * // → "a1b2c3d|e4f5g6h| (HEAD -> main)|feat: add login\nd8e9f0a||  (origin/dev)|fix: typo"
 */
function getGitLog(cli, gitRoot) {
  // Récupère l'historique complet de toutes les branches avec un format parseable
  const log = execGit(
    cli,
    'git log --pretty=format:"%H|%P|%d|%s" --all',
    {
      cwd: gitRoot,
      errorMessage: "Failed to read git log",
    },
  );

  // Indique le nombre de commits récupérés pour faciliter le debug
  const count = log ? log.split("\n").length : 0;
  cli.log(`📋 Git log fetched — ${count} commit(s)`);

  return log;
}

module.exports = getGitLog;