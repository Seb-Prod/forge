#!/usr/bin/env node
process.stdout.write('\x1Bc');
const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

const args = process.argv;
const silent = args.includes("--silent");

function getArgValue(flag) {
  const index = args.indexOf(flag);
  if (index !== -1 && args[index + 1] && !args[index + 1].startsWith("--")) {
    return args[index + 1];
  }
  return null;
}

const branchToDelete = getArgValue("--branch");
const parentBranch = getArgValue("--parent");

function log(...messages) {
  if (!silent) process.stdout.write(messages.join(" ") + "\n");
}

if (!branchToDelete) {
  console.error("❌ Missing --branch argument");
  process.exit(1);
}

if (!parentBranch) {
  console.error("❌ Missing --parent argument");
  process.exit(1);
}

const resolved = path.resolve(process.cwd());

/* Branches protégées */
const mainBranch = "main";
const developBranch = "develop";

/* Branche actuelle */
const currentBranch = execSync("git branch --show-current", {
  cwd: resolved,
  encoding: "utf-8",
}).trim();

/* Analyse des risques */
const risks = [];

// 1. Branche protégée
const protectedBranches = new Set([mainBranch, developBranch]);
if (protectedBranches.has(branchToDelete)) {
  risks.push("Branch is protected (main or develop)");
}

// 2. Branche courante
if (branchToDelete === currentBranch) {
  risks.push("Branch is currently checked out");
}

// 3. Commits non mergés dans le parent
try {
  // ✅ On s'assure que la référence remote est utilisée si la locale n'existe pas
  const base = execSync(
    `git rev-parse --verify ${parentBranch} 2>/dev/null || git rev-parse --verify origin/${parentBranch}`,
    { cwd: resolved, encoding: "utf-8" }
  ).trim();

  const unmergedCommits = execSync(
    `git log ${base}..${branchToDelete} --oneline`,
    { cwd: resolved, encoding: "utf-8" }
  ).trim();

  if (unmergedCommits) {
    const count = unmergedCommits.split("\n").length;
    risks.push(`${count} unmerged commit(s) into ${parentBranch}`);
  }
} catch {
  risks.push(`Could not compare with parent branch "${parentBranch}"`);
}

// 4. Branche existante sur le remote
try {
  const remoteExists = execSync(
    `git ls-remote --heads origin ${branchToDelete}`,
    { cwd: resolved, encoding: "utf-8" }
  ).trim();

  if (remoteExists) {
    risks.push("Branch still exists on remote (origin)");
  }
} catch {
  // pas bloquant
}

const isSafe = risks.length === 0;

log("🪵 Branch to delete :", branchToDelete);
log("🌿 Parent branch    :", parentBranch);
log("📍 Current branch   :", currentBranch);
log(isSafe ? "✅ Safe to delete" : "⚠️  Risks detected:");
if (!isSafe) risks.forEach(r => log("   -", r));

const result = {
  branch: branchToDelete,
  parent: parentBranch,
  currentBranch,
  isSafe,
  risks,
};

const outFile = path.join(os.tmpdir(), "git-delete-branch-" + process.pid + ".json");
fs.writeFileSync(outFile, JSON.stringify(result, null, 2));

log("__OUTPUT_FILE__:" + outFile);

if (silent) {
  process.stdout.write("__OUTPUT_FILE__:" + outFile + "\n");
}

process.exit(0);