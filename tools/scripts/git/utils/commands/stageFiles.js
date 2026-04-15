const execGit = require("../core/execGit");

/**
 * Ajoute une liste de fichiers à l'index Git (staging area).
 *
 * Les fichiers sont indexés un par un pour permettre une gestion
 * granulaire des erreurs : un fichier manquant n'interrompt pas
 * le staging des fichiers suivants.
 *
 * @param {object}   cli      - Instance CLI exposant `safeExec`, `log` et `pushError`
 * @param {string}   gitRoot  - Chemin absolu vers la racine du dépôt Git (utilisé comme `cwd`)
 * @param {string[]} files    - Liste des chemins de fichiers à indexer
 *
 * @returns {{
 *   success: boolean,
 *   staged:  string[],
 *   failed:  Array<{ file: string, error: string }>,
 *   error?:  string
 * }} Résultat du staging :
 *   - `success` : `true` si tous les fichiers ont été indexés sans erreur
 *   - `staged`  : liste des fichiers indexés avec succès
 *   - `failed`  : liste des fichiers en échec avec le message d'erreur associé
 *   - `error`   : message d'erreur global (uniquement si `files` est vide)
 *
 * @example
 * const result = stageFiles(cli, "/home/user/my-repo", ["src/index.js", "README.md"]);
 * if (!result.success) {
 *   console.log("Failed files:", result.failed);
 * }
 */
function stageFiles(cli, gitRoot, files) {
  // Cas dégénéré : aucun fichier fourni — probablement une erreur en amont
  if (files.length === 0) {
    cli.pushError("No files to stage", false);
    return { success: false, error: "No files to stage", staged: [], failed: [] };
  }

  const staged = [];
  const failed = [];

  // Indexe chaque fichier individuellement pour isoler les erreurs
  files.forEach((file) => {
    try {
      execGit(cli, `git add -- ${file}`, {
        cwd: gitRoot,
        errorMessage: `Failed to stage file: ${file}`,
      });

      staged.push(file);
    } catch (err) {
      // Erreur non fatale : on continue avec les fichiers suivants
      failed.push({ file, error: err.message });
      cli.pushError(`Could not stage "${file}": ${err.message}`, false);
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