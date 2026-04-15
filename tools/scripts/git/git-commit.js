#!/usr/bin/env node

/**
 * @file git-commit.js
 * @description Point d'entrée CLI pour indexer (stage) des fichiers et créer un commit Git.
 *
 * Ce script est conçu pour être appelé en ligne de commande par un orchestrateur
 * ou un pipeline externe. Il effectue dans l'ordre :
 *   1. Validation des arguments CLI
 *   2. Parsing des fichiers à indexer
 *   3. Staging des fichiers
 *   4. Création du commit
 *   5. Push de la branche courante
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

const { cli, git, cwd, gitRoot, currentBranch, parentBranch } = initCLI(
  process.argv,
  "git-commit",
);

// Récupération des arguments CLI
const filesArg = cli.getArgValue("--files");
const commitMessage = cli.getArgValue("--message");

// Validation des arguments requis
if (!filesArg) cli.pushError("Missing --files argument");
if (!commitMessage) cli.pushError("Missing --message argument");

// Stop immédiat si erreur fatale (arguments manquants)
if (cli.hasFatalError)
  cli.exitWithResult({ branch: null, result: false });

// Parsing JSON des fichiers à stage
const filesToStage = cli.parseJSONArg(filesArg, "Invalid JSON for --files");

// Validation métier : doit être un tableau non vide
if (!Array.isArray(filesToStage) || filesToStage.length === 0) {
  cli.pushError("Files must be a non-empty array");
}

// Stop si erreur après parsing
if (cli.hasFatalError)
  cli.exitWithResult({ branch: null, result: false });

console.log("filesToStage =", filesToStage);
console.log("isArray =", Array.isArray(filesToStage));

// Indexation des fichiers dans le staging area Git
git.stageFiles(gitRoot, filesToStage);

// Stop si erreur pendant le staging (ex: fichier introuvable)
if (cli.hasFatalError)
  cli.exitWithResult({ branch: currentBranch, result: false });

// Création du commit avec le message fourni
git.commitChanges(gitRoot, commitMessage);

// Stop si erreur pendant le commit (ex: rien à commiter)
if (cli.hasFatalError)
  cli.exitWithResult({ branch: currentBranch, result: false });

// Push de la branche courante vers le remote
git.pushBranch(gitRoot, currentBranch);

// Sortie finale standardisée (toujours appelée en fin de script)
cli.exitWithResult({
  branch: currentBranch,
  result: !cli.hasFatalError,
});