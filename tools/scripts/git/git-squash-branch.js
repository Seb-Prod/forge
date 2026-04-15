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

const { cli, git, cwd, gitRoot, currentBranch, parentBranch } = initCLI(
  process.argv,
  "git-squash-branch",
);

// Récupération des arguments CLI
const branch = cli.getArgValue("--branch");
const commitMessage = cli.getArgValue("--message");

// Validation des arguments requis
if (!branch) cli.pushError("Missing --branch argument");
if (!commitMessage) cli.pushError("Missing --message argument");

// Stop immédiat si erreur fatale (arguments manquants)
if (cli.hasFatalError)
  cli.exitWithResult({ branch: null, result: false });

// Synchronisation des refs distantes (nécessaire pour un merge-base fiable)
git.fetchRemote(gitRoot);

// Stop si le fetch a échoué (remote inaccessible en mode fatal)
if (cli.hasFatalError)
  cli.exitWithResult({ branch: null, result: false });

// Sécurité : interdit le squash sur les branches protégées
const protectedBranches = ["main", "master", "develop"];
if (protectedBranches.includes(currentBranch)) {
  cli.pushError(`Cannot squash protected branch: ${currentBranch}`);
}

// Cohérence : la branche courante doit correspondre à l'argument --branch
if (currentBranch !== branch) {
  cli.pushError(`You are on "${currentBranch}", expected "${branch}"`);
}

// Stop si branche protégée ou incohérence détectée
if (cli.hasFatalError)
  cli.exitWithResult({ branch: null, result: false });

// Sécurité : le working tree doit être propre avant le squash
if (!git.isWorkingTreeClean(gitRoot))
  cli.exitWithResult({ branch: currentBranch, result: false });

// Vérification : parentBranch doit être résolu pour construire la ref origin/<parent>
if (!parentBranch) {
  cli.pushError("Could not resolve parent branch — cannot squash");
  cli.exitWithResult({ branch: currentBranch, result: false });
}

// Squash de tous les commits de la branche sur origin/<parentBranch>
git.squashBranch(gitRoot, `origin/${parentBranch}`);

// Stop si le squash a échoué (repo potentiellement en état intermédiaire)
if (cli.hasFatalError)
  cli.exitWithResult({ branch: currentBranch, result: false });

// Commit unique avec le message fourni
git.commitChanges(gitRoot, commitMessage);

// Stop si le commit a échoué
if (cli.hasFatalError)
  cli.exitWithResult({ branch: currentBranch, result: false });

// Force push sécurisé (--force-with-lease) requis après réécriture d'historique
git.pushBranch(gitRoot, currentBranch, "origin", true);

// Sortie finale standardisée (toujours appelée en fin de script)
cli.exitWithResult({
  branch: currentBranch,
  result: !cli.hasFatalError,
});