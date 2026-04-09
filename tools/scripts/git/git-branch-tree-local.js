#!/usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

const args = process.argv.slice(2);
const silent = args.includes("--silent");
const targetPath = args.find((arg) => !arg.startsWith("--")) || "";
const resolved = path.resolve(path.join(__dirname, "../../../", targetPath));

function log(...args) {
  if (!silent) console.log(...args);
}

log(`🌳 Building LOCAL git tree in: ${resolved}\n`);

try {
  const currentBranch = execSync("git branch --show-current", {
    cwd: resolved,
    encoding: "utf-8",
  }).trim();

  // 🌿 Local branches
  const localBranchesRaw = execSync('git branch --format="%(refname:short)"', {
    cwd: resolved,
    encoding: "utf-8",
  })
    .trim()
    .split("\n")
    .filter(Boolean);

  // 🌐 Remote branches (déjà fetchées par le script remote, on lit juste les refs locales)
  const remoteBranchesRaw = execSync(
    'git branch -r --format="%(refname:short)"',
    { cwd: resolved, encoding: "utf-8" },
  )
    .trim()
    .split("\n")
    .filter((b) => b && !b.includes("HEAD"));

  const localSet = new Set(localBranchesRaw);
  const remoteSet = new Set(
    remoteBranchesRaw.map((b) => b.replace("origin/", "")),
  );

  // 📜 Git log complet (--all pour voir toutes les branches)
  const raw = execSync('git log --pretty=format:"%H|%P|%d|%s" --all', {
    cwd: resolved,
    encoding: "utf-8",
    maxBuffer: 1024 * 1024 * 10,
  });

  const nodes = {};
  const edges = [];

  raw.split("\n").forEach((line) => {
    const [hash, parents, refs, message] = line.split("|");
    const parentList = parents ? parents.trim().split(" ").filter(Boolean) : [];

    nodes[hash] = {
      id: hash,
      message,
      refs: refs ? refs.replace(/[()]/g, "").split(", ").filter(Boolean) : [],
      parents: parentList,
    };

    parentList.forEach((parent) => {
      edges.push({ from: hash, to: parent });
    });
  });

  // 🔥 Branch heads
  const branchHeads = {};

  Object.values(nodes).forEach((node) => {
    node.refs.forEach((ref) => {
      if (!ref || ref.includes("HEAD")) return;

      const clean = ref.replace("origin/", "").trim();
      if (!localSet.has(clean) && !remoteSet.has(clean)) return;

      // log("📋 localSet:", [...localSet]);
      // log("📋 remoteSet:", [...remoteSet]);
      // log("📋 branchHeads:", branchHeads);

      const isRemote = ref.startsWith("origin/");
      if (!branchHeads[clean]) {
        branchHeads[clean] = node.id;
      } else if (!isRemote) {
        // Local écrase remote
        branchHeads[clean] = node.id;
      }
    });
  });

  for (const branch of localSet) {
    if (!branchHeads[branch]) {
      try {
        const hash = execSync(`git rev-parse "refs/heads/${branch}"`, {
          cwd: resolved,
          encoding: "utf-8",
        }).trim();
        branchHeads[branch] = hash;
        log(`🔧 Branch head resolved via rev-parse: ${branch} → ${hash}`);
      } catch {
        log(`⚠️ Could not resolve head for branch: ${branch}`);
      }
    }
  }

  // 🌿 Branches list
  const branches = Object.keys(branchHeads).map((name) => ({
    name,
    local: localSet.has(name),
    remote: remoteSet.has(name),
  }));

  // 🚀 BUILD TREE (BFS)
  const commitToBranches = {};
  Object.entries(branchHeads).forEach(([branch, head]) => {
    if (!commitToBranches[head]) commitToBranches[head] = [];
    commitToBranches[head].push(branch);
  });

  const nodeMap = {};
  Object.values(nodes).forEach((n) => {
    nodeMap[n.id] = n;
  });

  function findParentBranch(startCommit, currentBranch) {
    // 🔥 Branches sœurs = celles qui pointent sur le même commit de départ
    const siblingBranches = new Set(commitToBranches[startCommit] ?? []);

    const visited = new Set();
    const queue = [startCommit];
    let isFirst = true;
    let i = 0;

    while (i < queue.length) {
      const commit = queue[i++];
      if (!commit || visited.has(commit)) continue;
      visited.add(commit);

      if (!isFirst) {
        const branchesHere = commitToBranches[commit];
        if (branchesHere) {
          // 🔥 Exclure les branches sœurs (même commit de départ)
          const parent = branchesHere.find(
            (b) => b !== currentBranch && !siblingBranches.has(b),
          );
          if (parent) return parent;
        }
      }

      isFirst = false;

      const node = nodeMap[commit];
      if (node?.parents) queue.push(...node.parents);
    }

    return null;
  }

  const branchTree = Object.keys(branchHeads).map((branch) => ({
    name: branch,
    parent: findParentBranch(branchHeads[branch], branch),
  }));

  const result = {
    currentBranch,
    branches,
    branchTree,
    nodes: Object.values(nodes),
    edges,
  };

  const outFile = path.join(
    os.tmpdir(),
    "git-tree-local-" + process.pid + ".json",
  );
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));

  log("✅ " + result.nodes.length + " commits");
  log("🌿 Branche courante: " + currentBranch);
  log("🌳 " + branchTree.length + " branches structurées");
  log("__OUTPUT_FILE__:" + outFile);

  if (silent) console.log("__OUTPUT_FILE__:" + outFile);

  process.exit(0);
} catch (error) {
  if (!silent) {
    console.error("❌ Failed to build local git tree");
    if (error.stderr) console.error(error.stderr.toString());
  }
  process.exit(1);
}
