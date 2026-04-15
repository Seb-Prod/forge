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

const { cli, git, gitRoot, currentBranch } = initCLI(
  process.argv,
  "git-commit",
);

function main() {
  const filesArg = cli.getArgValue("--files");
  const commitMessage = cli.getArgValue("--message");

  if (!filesArg) throw new Error("Missing --files argument");
  if (!commitMessage) throw new Error("Missing --message argument");

  const filesToStage = cli.parseJSONArg(filesArg, "Invalid JSON for --files");

  if (!Array.isArray(filesToStage) || filesToStage.length === 0) {
    throw new Error("Files must be a non-empty array");
  }

  git.stageFiles(gitRoot, filesToStage);
  git.commitChanges(gitRoot, commitMessage);
  git.pushBranch(gitRoot, currentBranch);
}

// Runner centralisé
(async () => {
  try {
    main();

    cli.exitWithResult({
      branch: currentBranch,
      result: true,
    });

  } catch (error) {
    cli.pushError(error.message);

    cli.exitWithResult({
      branch: currentBranch || null,
      result: false,
    });
  }
})();