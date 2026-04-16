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

//#region Étapes métier

function validateArgs() {
  const { isValid, errors, values } = cli.validateArgs([
    "--branch",
    "--files",
    "--message",
  ]);

  if (!isValid) {
    throw new Error(errors.join(", "));
  }

  return values;
}

function validateBranch(branch) {
  const result = git.validateBranchContext({
    currentBranch,
    targetBranch: branch,
    enforceMatch: true,
    checkProtected: false,
  });

  if (!result.success) throw new Error(result.errors.join(", "));
}

function parseJSON(files) {
  const filesToStage = cli.parseJSONArg(files, "Invalid JSON for --files");

  if (!Array.isArray(filesToStage) || filesToStage.length === 0) {
    throw new Error("Files must be a non-empty array");
  }

  return filesToStage;
}

function stage(files) {
  const result = git.stageFiles(gitRoot, files);

  if (!result.success) {
    throw new Error(`${result.failed.length} file(s) failed to stage`);
  }

  return result;
}

function commit(commitMessage) {
  const result = git.commitChanges(gitRoot, commitMessage);
  if (!result.success) throw new Error(result.error);
}

function push() {
  const result = git.pushBranch(gitRoot, currentBranch);
  if (!result.success) throw new Error(result.error);
}
//#endregion

//#region Orchestration

function main() {
  const { branch, message, files } = validateArgs();
  validateBranch(branch);
  const filesToStage = parseJSON(files);
  stage(filesToStage);
  commit(message);
  push();
}
//#endregion

//#region Runner

(() => {
  try {
    main();
    cli.exitWithResult({ branch: currentBranch, result: true });
  } catch (error) {
    cli.pushError(error.message, true);
    cli.exitWithResult({ branch: currentBranch || null, result: false });
  }
})();
//#endregion
