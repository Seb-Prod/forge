/**
 * Affiche le logo CLI Forge sur stdout, sauf en mode silencieux.
 *
 * @param {Function} log - Fonction d'écriture sur stdout (ex: cli.log)
 * @param {boolean} silent - Si true, la fonction retourne immédiatement sans rien afficher
 */
function printLogo(log, silent) {
  if (silent) return;

  const logo = `
\x1b[33m
   ⚒️  CLI FORGE
\x1b[0m
   \x1b[90mby Seb-Prod © 2026\x1b[0m

   \x1b[36mTip:\x1b[0m Use \x1b[33mReact Forge\x1b[0m for an easier experience
   \x1b[90m(run scripts with UI instead of CLI)\x1b[0m
  `;

  log(logo);
}

module.exports = { printLogo };
