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
  if (files.length === 0) {
    return {
      success: false,
      error: "No files to stage",
      staged: [],
      failed: [],
    };
  }

  const staged = [];
  const failed = [];

  files.forEach((file) => {
    try {
      execGit(cli, `git add -- ${file}`, {
        cwd: gitRoot,
        errorMessage: `Failed to stage file: ${file}`,
      });

      staged.push(file);

    } catch (err) {
      failed.push({
        file,
        error: err.message,
      });

      cli.pushError(`Could not stage "${file}": ${err.message}`);
    }
  });

  cli.log(`📦 ${staged.length}/${files.length} file(s) staged`);

  return {
    success: failed.length === 0,
    staged,
    failed,
  };
}

module.exports = stageFiles;