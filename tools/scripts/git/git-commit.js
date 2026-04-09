#!/usr/bin/env node

/**
 * @file git-commit.js
 * @description Ajoute des fichiers au staging et crée un commit Git.
 *
 * @usage
 *   node git-commit.js --files '["file1.js","file2.js"]' --message "feat: update"
 *
 * @output Fichier JSON via writeOutputFile("git-commit", { branch, result, messages })
 */

const { execSync } = require("child_process");
const { createCLIContext } = require("../utils/cli");
const { clearConsole } = require("../utils/console");
const { printLogo } = require("../utils/logo");
const { safeExec } = require("../utils/safeExec");

const cli = createCLIContext(process.argv);
clearConsole(cli.args);
printLogo(cli.log, cli.silent);

const messages = [];
let hasFatalError = false;
const cwd = cli.resolveCwd();

/** ---------- Helpers ---------- */

function exitWithResult(branch = null, result = false) {
  cli.writeOutputFile("git-commit", { branch, result, messages });
  process.exit(hasFatalError ? 1 : 0);
}

function parseFiles(filesArg) {
  try {
    const files = JSON.parse(filesArg);
    if (!Array.isArray(files) || files.length === 0) {
      throw new Error("Files must be a non-empty array");
    }
    return files;
  } catch {
    messages.push("Invalid JSON for --files");
    hasFatalError = true;
    return [];
  }
}

function getCurrentBranch(gitRoot) {
  try {
    const branch = execSync("git rev-parse --abbrev-ref HEAD", {
      cwd: gitRoot,
      encoding: "utf-8",
    }).trim();

    if (branch === "HEAD") {
      cli.log("⚠️ Detached HEAD state detected");
      messages.push("Detached HEAD state");
    } else {
      cli.log(`🌿 Current branch: ${branch}`);
    }

    return branch;
  } catch (err) {
    messages.push("Git branch detection failed: " + err.message);
    return null;
  }
}

function stageFiles(gitRoot, files) {
  try {
    files.forEach((file) => {
      execSync(`git add "${file}"`, { cwd: gitRoot });
    });
    cli.log(`📦 ${files.length} file(s) staged`);
  } catch (err) {
    messages.push("Git add failed: " + err.message);
    hasFatalError = true;
  }
}

function commitChanges(gitRoot, commitMessage) {
  try {
    // Vérifie s'il y a réellement des changements staged
    const hasChanges = execSync("git diff --cached --quiet || echo 'changes'", {
      cwd: gitRoot,
      encoding: "utf-8",
    }).trim();

    if (!hasChanges) {
      cli.log("⚠️ No staged changes to commit");
      messages.push("No changes to commit");
      hasFatalError = true;
      return;
    }

    execSync(`git commit -m ${JSON.stringify(commitMessage)}`, {
      cwd: gitRoot,
      stdio: "inherit",
    });

    cli.log("✅ Commit created");
  } catch (err) {
    messages.push("Git commit failed: " + err.message);
    hasFatalError = true;
  }
}

/** ---------- Main Script ---------- */

const filesArg = cli.getArgValue("--files");
const commitMessage = cli.getArgValue("--message");

if (!filesArg) {
  messages.push("Missing --files argument");
  hasFatalError = true;
}
if (!commitMessage) {
  messages.push("Missing --message argument");
  hasFatalError = true;
}

if (hasFatalError) exitWithResult();

const gitRoot = safeExec(
  () =>
    execSync("git rev-parse --show-toplevel", {
      cwd,
      encoding: "utf-8",
    }).trim(),
  "Not a git repository",
);

if (!gitRoot) {
  messages.push("Git repository root not found");
  hasFatalError = true;
  exitWithResult();
}

const filesToStage = parseFiles(filesArg);
if (hasFatalError) exitWithResult();

const currentBranch = getCurrentBranch(gitRoot);

stageFiles(gitRoot, filesToStage);
if (hasFatalError) exitWithResult();

commitChanges(gitRoot, commitMessage);

exitWithResult(currentBranch, !hasFatalError);