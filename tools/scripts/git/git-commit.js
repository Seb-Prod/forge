#!/usr/bin/env node

/**
 * @file git-commit.js
 * @description Point d'entrée CLI pour indexer (stage) des fichiers et créer un commit Git.
 *
 * Ce script est conçu pour être appelé en ligne de commande par un orchestrateur
 * ou un pipeline externe. Il effectue dans l'ordre :
 *   1. Validation des arguments CLI
 *   2. Parsing des fichiers à indexer
 *   3. Staging des fichiers (résultat granulaire via stageFiles)
 *   4. Création du commit
 *   5. Push de la branche courante
 *
 * Toute erreur dans `main()` est capturée par le runner et convertie
 * en `cli.pushError` avant une sortie standardisée.
 *
 * @usage
 *   node git-commit.js --files '["src/index.js","README.md"]' --message "feat: my commit"
 *
 * @argument {string} --files   Tableau JSON des chemins de fichiers à indexer
 * @argument {string} --message Message du commit Git
 *
 * @exits {branch: string|null, result: boolean}
 */

const initCLI = require("./core/initCLI");

const { cli, git, gitRoot, currentBranch } = initCLI(
  process.argv,
  "git-commit",
);

/**
 * Logique principale du script.
 * Toutes les erreurs sont propagées via `throw` et capturées par le runner.
 *
 * @throws {Error} Si un argument est manquant, invalide, ou si une étape Git échoue
 */
function main() {
  // Récupération et validation des arguments CLI
  const filesArg = cli.getArgValue("--files");
  const commitMessage = cli.getArgValue("--message");

  if (!filesArg) throw new Error("Missing --files argument");
  if (!commitMessage) throw new Error("Missing --message argument");

  // Parsing et validation du tableau de fichiers
  const filesToStage = cli.parseJSONArg(filesArg, "Invalid JSON for --files");

  if (!Array.isArray(filesToStage) || filesToStage.length === 0) {
    throw new Error("Files must be a non-empty array");
  }

  // Staging granulaire : chaque fichier est traité indépendamment
  const stageResult = git.stageFiles(gitRoot, filesToStage);

  if (!stageResult.success) {
    throw new Error(`${stageResult.failed.length} file(s) failed to stage`);
  }

  // Création du commit avec le message fourni
  const commitResult = git.commitChanges(gitRoot, commitMessage);

  if (!commitResult.success) {
    throw new Error(commitResult.error);
  }

  // Push de la branche courante vers le remote
  const pushResult = git.pushBranch(gitRoot, currentBranch);

  if (!pushResult.success) {
    throw new Error(pushResult.error);
  }
}

// Runner centralisé : capture toutes les erreurs de main() et garantit une sortie propre
(() => {
  try {
    main();

    cli.exitWithResult({
      branch: currentBranch,
      result: true,
    });
  } catch (error) {
    // Erreur fatale : on enregistre et on sort avec result: false
    cli.pushError(error.message, true);

    cli.exitWithResult({
      branch: currentBranch || null,
      result: false,
    });
  }
})();
