#!/usr/bin/env node

/**
 * Script CLI pour stage + commit Git
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


// Ajout des fichiers au staging
git.stageFiles(gitRoot, filesToStage);

// Stop si erreur pendant le staging
if (cli.hasFatalError)
  cli.exitWithResult({ branch: currentBranch, result: false });

// Création du commit
git.commitChanges(gitRoot, commitMessage);

// Push
git.pushBranch(gitRoot, currentBranch);

// Sortie finale standardisée (toujours appelée)
cli.exitWithResult({
  branch: currentBranch,
  result: !cli.hasFatalError,
});
