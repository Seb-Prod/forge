#!/usr/bin/env node

/**
 * @file git-squash-branch.js
 * @description Point d'entrée CLI pour squasher tous les commits d'une branche en un seul.
 *
 * Ce script est conçu pour être appelé en ligne de commande par un orchestrateur
 * ou un pipeline externe. Il effectue dans l'ordre :
 *   1. Validation des arguments CLI
 *   2. Synchronisation des refs distantes (fetch)
 *   3. Vérifications de sécurité (branche protégée, branche courante, working tree)
 *   4. Squash des commits via reset --soft sur origin/<parentBranch>
 *   5. Commit unique avec le message fourni
 *   6. Force push avec --force-with-lease
 *
 * ⚠️ Cette opération réécrit l'historique — ne pas utiliser sur des branches partagées.
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
  "git-squash-branch",
);

//#region Étapes métier

function validateArgs() {
  const { isValid, errors, values } = cli.validateArgs([
    "--branch",
    "--message",
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

function validateBranch(branch) {
  const result = git.validateBranchContext({
    currentBranch,
    targetBranch: branch,
    enforceMatch: true,
    checkProtected: true,
  });

  if (!result.success) throw new Error(result.errors.join(", "));
}

function checkWorkingTree() {
  const result = git.isWorkingTreeClean(gitRoot);
  if (!result.success || !result.clean) throw new Error(result.error);
}

function squash() {
  if (!parentBranch)
    throw new Error("Could not resolve parent branch — cannot squash");

  const result = git.squashBranch(gitRoot, `origin/${parentBranch}`);
  if (!result.squashed) throw new Error(result.error);
}

function commit(commitMessage) {
  const result = git.commitChanges(gitRoot, commitMessage);
  if (!result.success) throw new Error(result.error);
}

function push() {
  const result = git.pushBranch(gitRoot, currentBranch, "origin", true);
  if (!result.success) throw new Error(result.error);
}
//#endregion

//#region Orchestration

function main() {
  const { branch, message } = validateArgs();

  syncRemote();
  validateBranch(branch);
  checkWorkingTree();
  squash();
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
