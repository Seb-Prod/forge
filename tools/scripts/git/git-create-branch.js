#!/usr/bin/env node

/**
 * @file git-create-branch.js
 * @description Crée une nouvelle branche Git après vérification que le working tree est propre.
 *
 * @usage
 *   node git-create-branch.js --branch <nom-de-branche> [--silent]
 *
 * @example
 *   node git-create-branch.js --branch feature/mon-feature
 *   node git-create-branch.js --branch fix/bug-123 --silent
 *
 * @output Fichier JSON via writeOutputFile("git-create-branch", { branch, isClean, messages })
 */

const { execSync } = require("child_process");
const { createCLIContext } = require("../utils/cli");
const { clearConsole } = require("../utils/console");
const { printLogo } = require("./utils");

const cli = createCLIContext(process.argv);

clearConsole(cli.args);
printLogo(cli.log, cli.silent);

/** Nom de la branche à créer, fourni via --branch */
const branchName = cli.getArgValue("--branch");

if (!branchName) {
  console.error("❌ Missing --branch argument");
  process.exit(1);
}

const cwd = cli.resolveCwd();

/** True si le working tree ne contient aucun changement non commité */
let isClean = false;

/** Accumule les erreurs ou avertissements rencontrés durant l'exécution */
const messages = [];

// — Étape 1 : vérification du working tree
try {
  const output = execSync("git status --porcelain", {
    cwd,
    encoding: "utf-8",
  }).trim();

  isClean = output === "";

  if (isClean) {
    cli.log("✅ Working tree clean");
  } else {
    cli.log("⚠️ Uncommitted changes:");
    cli.log(output);
    messages.push("Working tree not clean");
  }
} catch (err) {
  messages.push("Git status failed: " + err.message);
}

// — Étape 2 : vérification + création de la branche
if (isClean && messages.length === 0) {
  try {
    // Synchronise les refs remote avant la vérification
    execSync("git fetch --quiet", { cwd });

    const branchExists =
      execSync(
        `git branch --all --list ${branchName} remotes/*/${branchName}`,
        { cwd, encoding: "utf-8" },
      ).trim() !== "";

    if (branchExists) {
      cli.log(`⚠️ Branch '${branchName}' already exists`);
      messages.push(`Branch '${branchName}' already exists`);
    } else {
      execSync(`git checkout -b ${branchName}`, {
        cwd,
        stdio: "inherit",
      });

      // 👉 Push direct avec upstream
      execSync(`git push -u origin ${branchName}`, {
        cwd,
        stdio: "inherit",
      });

      cli.log(`🚀 Branch '${branchName}' created and linked to origin`);
    }
  } catch (err) {
    messages.push("Branch creation failed: " + err.message);
  }
}

cli.writeOutputFile("git-create-branch", {
  branch: branchName,
  result: messages.length === 0,
  messages,
});

process.exit(0);
