#!/usr/bin/env node

/**
 * @file git-create-branch.js
 * @description Point d'entrée CLI pour créer une nouvelle branche Git et la pousser sur le remote.
 *
 * Ce script est conçu pour être appelé en ligne de commande par un orchestrateur
 * ou un pipeline externe. Il effectue dans l'ordre :
 *   1. Validation des arguments CLI
 *   2. Synchronisation des refs distantes (fetch --prune)
 *   3. Vérification que le working tree est propre
 *   4. Vérification que la branche n'existe pas déjà (local + remote)
 *   5. Création de la branche et checkout
 *   6. Push de la nouvelle branche sur le remote
 *
 * Toute erreur dans `main()` est capturée par le runner et convertie
 * en `cli.pushError` avant une sortie standardisée.
 *
 * @usage
 *   node git-create-branch.js --branch <nom-de-branche>
 *
 * @argument {string} --branch Nom de la nouvelle branche à créer
 *
 * @exits {branch: string|null, result: boolean}
 */

const initCLI = require("./core/initCLI");

const { cli, git, gitRoot, currentBranch } = initCLI(
  process.argv,
  "git-create-branch",
);

//#region Étapes métier

function validateArgs() {
  const { isValid, errors, values } = cli.validateArgs([
    "--branch",
  ]);

  if (!isValid) {
    throw new Error(errors.join(", "));
  }

  return values;
}

function syncRemote() {
  const result = git.fetchRemote(gitRoot);
  if (!result.success) throw new Error(result.error);
}

function checkWorkingTree() {
  const result = git.isWorkingTreeClean(gitRoot);
  if (!result.success || !result.clean) throw new Error(result.error);
}

function checkBranchExists(branch) {
  const result = git.branchExists(gitRoot, branch);
  if (result.exists) throw new Error(`Branch '${branch}' already exists`);
}

function createBranch(branch) {
  const result = git.checkoutNewBranch(gitRoot, branch);
  if (!result.success) throw new Error(result.error);
}

function push(branch) {
  const result = git.pushBranch(gitRoot, branch);
  if (!result.success) throw new Error(result.error);
}

//#endregion

//#region Orchestration

function main() {
  const { branch } = validateArgs();

  syncRemote();
  checkWorkingTree();
  checkBranchExists(branch);
  createBranch(branch);
  push(branch);
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