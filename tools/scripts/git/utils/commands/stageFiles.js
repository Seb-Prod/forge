const execGit = require("../core/execGit");

/**
 * Ajoute une liste de fichiers à l'index Git (staging).
 *
 * @param {string} gitRoot - Racine du dépôt Git
 * @param {string[]} files - Liste des chemins de fichiers à ajouter
 *
 * @throws {Error} Si l'ajout échoue
 */
function stageFiles(cli, gitRoot, files) {
  files.forEach((file) => {
    execGit(cli, `git add "${file}"`, { cwd: gitRoot });
  });

  cli.log(`📦 ${files.length} file(s) staged`);
}

module.exports = stageFiles;
