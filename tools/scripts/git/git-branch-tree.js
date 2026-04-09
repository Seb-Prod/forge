#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const args = process.argv.slice(2);
const silent = args.includes('--silent');

const targetPath = args.find(arg => !arg.startsWith('--')) || '';

const resolved = path.resolve(
  path.join(__dirname, '../../../', targetPath)
);

function log(...args) {
  if (!silent) console.log(...args);
}

log(`🌳 Building structured git tree in: ${resolved}\n`);

try {
  // 🔄 Sync remote refs (optionnel)
  try {
    execSync('git fetch --prune', {
      cwd: resolved,
      encoding: 'utf-8',
    });
    log('🔄 Remote refs synced');
  } catch {
    log('⚠️ git fetch failed (offline?), continuing...');
  }

  const currentBranch = execSync('git branch --show-current', {
    cwd: resolved,
    encoding: 'utf-8',
  }).trim();

  // 🌿 Local branches
  const localBranchesRaw = execSync(
    'git branch --format="%(refname:short)"',
    { cwd: resolved, encoding: 'utf-8' }
  ).trim().split('\n').filter(Boolean);

  // 🌐 Remote branches
  const remoteBranchesRaw = execSync(
    'git branch -r --format="%(refname:short)"',
    { cwd: resolved, encoding: 'utf-8' }
  ).trim().split('\n').filter(b => b && !b.includes('HEAD'));

  const localSet  = new Set(localBranchesRaw);
  const remoteSet = new Set(remoteBranchesRaw.map(b => b.replace('origin/', '')));

  // 📜 Git log (graph complet)
  const raw = execSync(
    'git log --pretty=format:"%H|%P|%d|%s" --all',
    {
      cwd: resolved,
      encoding: 'utf-8',
      maxBuffer: 1024 * 1024 * 10,
    }
  );

  const nodes = {};
  const edges = [];

  raw.split('\n').forEach(line => {
    const [hash, parents, refs, message] = line.split('|');

    const parentList = parents ? parents.trim().split(' ').filter(Boolean) : [];

    nodes[hash] = {
      id: hash,
      message,
      refs: refs
        ? refs.replace(/[()]/g, '').split(', ').filter(Boolean)
        : [],
      parents: parentList,
    };

    parentList.forEach(parent => {
      edges.push({ from: hash, to: parent });
    });
  });

  // 🔥 BRANCH HEADS CLEAN
  const branchHeads = {};

  Object.values(nodes).forEach(node => {
    node.refs.forEach(ref => {
      if (!ref || ref.includes('HEAD')) return;

      const clean = ref.replace('origin/', '').trim();

      if (!localSet.has(clean) && !remoteSet.has(clean)) return;

      const isRemote = ref.startsWith('origin/');
      if (!branchHeads[clean] || !isRemote) {
        branchHeads[clean] = node.id;
      }
    });
  });

  // 🌿 Branches list
  const branches = Object.keys(branchHeads).map(name => ({
    name,
    local:  localSet.has(name),
    remote: remoteSet.has(name),
  }));

  // ===============================
  // 🚀 BUILD TREE OPTIMISÉ (BFS)
  // ===============================

  // 🔥 commit → branches map
  const commitToBranches = {};

  Object.entries(branchHeads).forEach(([branch, head]) => {
    if (!commitToBranches[head]) commitToBranches[head] = [];
    commitToBranches[head].push(branch);
  });

  // 🔥 nodes map (accès rapide)
  const nodeMap = {};
  Object.values(nodes).forEach(n => {
    nodeMap[n.id] = n;
  });

  // 🔥 BFS parent finder
  function findParentBranch(startCommit, currentBranch) {
    const visited = new Set();
    const queue = [startCommit];
    let i = 0;

    while (i < queue.length) {
      const commit = queue[i++];

      if (!commit || visited.has(commit)) continue;
      visited.add(commit);

      const branchesHere = commitToBranches[commit];

      if (branchesHere) {
        const parent = branchesHere.find(b => b !== currentBranch);
        if (parent) return parent;
      }

      const node = nodeMap[commit];
      if (node && node.parents) {
        queue.push(...node.parents);
      }
    }

    return null;
  }

  // 🔥 BUILD TREE
  const branchTree = Object.keys(branchHeads).map(branch => {
    const head = branchHeads[branch];
    const parent = findParentBranch(head, branch);

    return { name: branch, parent };
  });

  // ===============================

  const result = {
    currentBranch,
    branches,
    branchTree,
    nodes: Object.values(nodes),
    edges,
  };

  const outFile = path.join(
    os.tmpdir(),
    'git-tree-' + process.pid + '.json'
  );

  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));

  log('✅ ' + result.nodes.length + ' commits');
  log('🌿 Branche courante: ' + currentBranch);
  log('🌳 ' + branchTree.length + ' branches structurées');
  log('__OUTPUT_FILE__:' + outFile);

  if (silent) {
    console.log('__OUTPUT_FILE__:' + outFile);
  }

  process.exit(0);

} catch (error) {
  if (!silent) {
    console.error('❌ Failed to build git tree');
    if (error.stderr) console.error(error.stderr.toString());
  }
  process.exit(1);
}