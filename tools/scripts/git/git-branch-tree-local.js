#!/usr/bin/env node

/**
 * @file git-local-tree.js
 * Script CLI pour construire l'arbre Git local avec les commits par branche
 */

const { createCLIContext } = require("../utils/cli");
const { clearConsole } = require("../utils/console");
const { printLogo } = require("../utils/logo");
const { createGitUtils } = require("./utils")

// CLI init
const cli = createCLIContext(process.argv);
const git = createGitUtils(cli);

// UI
clearConsole(cli.args);
printLogo(cli.log, cli.silent);

// cwd
const cwd = cli.resolveCwd();


// ─────────────────────────────────────────────────────────────
// PARSE GIT LOG
// ─────────────────────────────────────────────────────────────

function parseGitLog(raw) {
  const nodes = {};
  const edges = [];

  raw.split("\n").forEach((line) => {
    const [hash, parents, refs, ...messageParts] = line.split("|");
    if (!hash) return;

    const parentList = parents
      ? parents.trim().split(" ").filter(Boolean)
      : [];

    const refList = refs
      ? refs
          .replace(/[()]/g, "")
          .split(",")
          .map((r) => r.trim())
          .filter(Boolean)
      : [];

    nodes[hash] = {
      id: hash,
      message: messageParts.join("|"),
      refs: refList,
      parents: parentList,
    };

    parentList.forEach((p) => edges.push({ from: hash, to: p }));
  });

  return { nodes, edges };
}


// ─────────────────────────────────────────────────────────────
// HEAD + BRANCHES EXTRACTION
// ─────────────────────────────────────────────────────────────

function extractBranchHeads(nodes) {
  const branchHeads = {};
  const localHeads = new Set();

  for (const node of Object.values(nodes)) {
    for (const ref of node.refs) {
      if (!ref) continue;

      // HEAD -> branch
      if (ref.startsWith("HEAD ->")) {
        const branch = ref.split("->")[1]?.trim();
        if (branch) {
          branchHeads[branch] = node.id;
          localHeads.add(branch);
        }
      }

      // local branch
      if (!ref.startsWith("origin/") && !ref.includes("HEAD")) {
        branchHeads[ref] = node.id;
        localHeads.add(ref);
      }

      // remote fallback
      if (ref.startsWith("origin/")) {
        const clean = ref.replace("origin/", "").trim();
        if (!localHeads.has(clean) && !branchHeads[clean]) {
          branchHeads[clean] = node.id;
        }
      }
    }
  }

  return branchHeads;
}


// ─────────────────────────────────────────────────────────────
// COMMIT CHAIN (Git-like first parent)
// ─────────────────────────────────────────────────────────────

function getCommitChain(headId, nodeMap, stopId = null) {
  const commits = [];
  const visited = new Set();

  let current = headId;

  while (current && !visited.has(current)) {
    visited.add(current);

    if (current === stopId) break;

    const node = nodeMap[current];
    if (!node) break;

    commits.push(node);

    // Git-style traversal
    current = node.parents?.[0];
  }

  return commits;
}


// ─────────────────────────────────────────────────────────────
// BRANCH TREE (simple & stable)
// ─────────────────────────────────────────────────────────────

function buildBranchTree(branchHeads, nodeMap) {
  return Object.entries(branchHeads).map(([branch, head]) => {
    let current = nodeMap[head];
    let parentBranch = null;

    const visited = new Set();

    while (current && !visited.has(current.id)) {
      visited.add(current.id);

      for (const ref of current.refs) {
        if (!ref || ref === branch) continue;

        if (!ref.startsWith("origin/") && !ref.includes("HEAD")) {
          parentBranch = ref;
          break;
        }
      }

      if (parentBranch) break;

      const parentId = current.parents?.[0];
      current = nodeMap[parentId];
    }

    return {
      name: branch,
      parent: parentBranch,
    };
  });
}


// ─────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────

const gitRoot = git.resolveGitRoot(cwd);
if (!gitRoot) cli.exitWithResult({});

const currentBranch = git.getCurrentBranch(gitRoot);
if (!currentBranch) cli.exitWithResult({});

const rawLog = git.getGitLog(gitRoot);
if (!rawLog) cli.exitWithResult({});

const { nodes, edges } = parseGitLog(rawLog);

const branchHeads = extractBranchHeads(nodes);
if (!Object.keys(branchHeads).length) {
  cli.exitWithResult({});
}

const branchTree = buildBranchTree(branchHeads, nodes);

const commitsByBranch = Object.fromEntries(
  Object.entries(branchHeads).map(([branch, head]) => {
    const parent = branchTree.find((b) => b.name === branch)?.parent;
    const parentHead = parent ? branchHeads[parent] : null;

    return [
      branch,
      getCommitChain(head, nodes, parentHead),
    ];
  })
);

const currentBranchCommits = commitsByBranch[currentBranch] ?? [];


// ─────────────────────────────────────────────────────────────
// OUTPUT
// ─────────────────────────────────────────────────────────────

cli.log(`✅ ${Object.keys(nodes).length} commits`);
cli.log(`🌿 Current branch: ${currentBranch}`);
cli.log(`🌳 ${branchTree.length} branches structurées`);

cli.exitWithResult({
  currentBranch,
  branches: Object.keys(branchHeads).map((name) => ({
    name,
    local: true,
    remote: false,
  })),
  branchTree,
  nodes: Object.values(nodes),
  edges,
  commitsByBranch,
  currentBranchCommits,
});