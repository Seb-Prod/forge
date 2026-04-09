#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const args = process.argv.slice(2);
const silent = args.includes('--silent');
const targetPath = args.find(arg => !arg.startsWith('--')) || '';
const resolved = path.resolve(path.join(__dirname, '../../../', targetPath));

function log(...args) {
  if (!silent) console.log(...args);
}

log(`🌐 Fetching REMOTE git branches in: ${resolved}\n`);

try {
  // 🔄 Sync remote refs
  try {
    execSync('git fetch --prune', {
      cwd: resolved,
      encoding: 'utf-8',
    });
    log('🔄 Remote refs synced');
  } catch {
    log('⚠️ git fetch failed (offline?), continuing...');
  }

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

  // 🌿 Branches list enrichie local + remote
  const allNames = new Set([...localSet, ...remoteSet]);

  const branches = Array.from(allNames).map(name => ({
    name,
    local:  localSet.has(name),
    remote: remoteSet.has(name),
  }));

  // ===============================

  const result = { branches };

  const outFile = path.join(os.tmpdir(), 'git-tree-remote-' + process.pid + '.json');
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));

  log('🌐 ' + remoteSet.size + ' branches remote détectées');
  log('🌿 ' + localSet.size + ' branches locales');
  log('__OUTPUT_FILE__:' + outFile);

  if (silent) console.log('__OUTPUT_FILE__:' + outFile);

  process.exit(0);
} catch (error) {
  if (!silent) {
    console.error('❌ Failed to fetch remote branches');
    if (error.stderr) console.error(error.stderr.toString());
  }
  process.exit(1);
}