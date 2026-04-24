#!/usr/bin/env node

/**
 * @file git-delete-branch.js
 * @description Point d'entrée CLI pour supprimer une branche.
 *
 * Ce script est conçu pour être appelé en ligne de commande par un orchestrateur
 * ou un pipeline externe. Il effectue dans l'ordre :
 *   1. Validation des arguments CLI
 *   2. Synchronisation des refs distantes (fetch)
 *   3. Vérifications de sécurité (branche protégée, branche courante)
 *   4. Suppresion de la branche
 *
 * ⚠️ .
 *
 * @usage
 *   node git-squash-branch.js --branch feature/login --message "feat: add login page"
 *
 * @argument {string} --branch  Nom de la branche à squasher (doit correspondre à la branche courante)
 * @argument {string} --message Message du commit unique résultant du squash
 *
 * @exits {branch: string|null, result: boolean}
 */

const initCLI = require("./core/initCLI");

const { cli, git, gitRoot, currentBranch, parentBranch } = initCLI(
  process.argv,
  "git-delete-branch",
);

//#region Étapes métier

function validateArgs() {
  const { isValid, errors, values } = cli.validateArgs(["--branch"]);

  if (!isValid) {
    throw new Error(errors.join(", "));
  }

  return values;
}

function syncRemote() {
  const result = git.fetchRemote(gitRoot);
  if (!result.success) throw new Error(result.error);
}

function checkBranchExists(branch) {
  const result = git.branchExists(gitRoot, branch);
  if (!result.exists) throw new Error(`Branch '${branch}' does not exist`);
}

function validateBranch(branch) {
  const result = git.validateBranchContext({
    currentBranch: branch,
    targetBranch: branch,
    enforceMatch: true,
    checkProtected: true,
  });

  if (!result.success) throw new Error(result.errors.join(", "));

  if (branch === currentBranch)
    throw new Error("you can't delete current branch");
}

function deleteLocalSoft(branch){
  const result = git.deleteLocalBrach(gitRoot, branch, false)
  console.log(result)
}

//#endregion

//#region Orchestration

function main() {
  const { branch } = validateArgs();

  syncRemote();
  checkBranchExists(branch);
  validateBranch(branch);
  cli.log("on va supprimer");
  deleteLocalSoft(branch)
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
