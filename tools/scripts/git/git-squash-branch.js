#!/usr/bin/env node

/**
 * Script CLI pour Squash d'une branch
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
if (!branch) cli.pushError("Missing --branch name");
if (!commitMessage) cli.pushError("Missing --message argument");

// Stop immédiat si erreur fatale (arguments manquants)
if (cli.hasFatalError) cli.exitWithResult({ branch: null, result: false });

// Sync remote
git.fetchRemote(gitRoot);

// Sécurité branches protégées
const protectedBranches = ["main", "master", "develop"];

if (protectedBranches.includes(currentBranch)) {
  cli.pushError(`Cannot squash protected branch: ${currentBranch}`);
}

// Vérification branche
if (currentBranch !== branch) {
  cli.pushError(`You are on "${currentBranch}", expected "${branch}"`);
}

if (cli.hasFatalError) {
  cli.exitWithResult({ branch: null, result: false });
}

if (!git.isWorkingTreeClean(gitRoot)) {
  cli.exitWithResult({
    branch: null,
    result: false,
  });
}

git.squashBranch(gitRoot, `origin/${parentBranch}`);

// Commit
git.commitChanges(gitRoot, commitMessage);

// Push
git.pushBranch(gitRoot, currentBranch, "origin", true);

// Sortie finale standardisée (toujours appelée)
cli.exitWithResult({
  branch: currentBranch,
  result: !cli.hasFatalError,
});
