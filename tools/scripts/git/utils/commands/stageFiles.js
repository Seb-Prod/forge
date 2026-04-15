const execGit = require("../core/execGit");

/**
 * Ajoute une liste de fichiers à l'index Git (staging area).
 *
 * Les fichiers sont indexés un par un pour permettre une gestion
 * granulaire des erreurs : un fichier manquant n'interrompt pas
 * le staging des fichiers suivants.
 *
 * @param {object}   cli      - Instance CLI exposant `safeExec` et `log`
 * @param {string}   gitRoot  - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 * @param {string[]} files    - Liste des chemins de fichiers à indexer
 *
 * @returns {void}
 *
 * @example
 * stageFiles(cli, "/home/user/my-repo", ["src/index.js", "README.md"]);
 */
function stageFiles(cli, gitRoot, files) {
  // Avertissement si la liste est vide — probablement une erreur en amont
  if (files.length === 0) {
    cli.pushError("No files to stage", false);
    return;
  }

  // Indexe chaque fichier individuellement pour isoler les erreurs par fichier
  files.forEach((file) => {
    try {
      execGit(cli, `git add -- ${file}`, {
        cwd: gitRoot,
        errorMessage: `Failed to stage file: ${file}`,
      });
    } catch (err) {
      // Une erreur sur un fichier n'interrompt pas le staging des suivants
      cli.pushError(`Could not stage "${file}": ${err.message}`, false);
    }
  });

  cli.log(`📦 ${files.length} file(s) staged`);
}

module.exports = stageFiles;