#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const args = process.argv.slice(2);

const silent = args.includes('--silent');

// récupérer le path (premier argument qui n'est pas une option)
const targetPath = args.find(arg => !arg.startsWith('--')) || '';

const resolved = path.resolve(
  path.join(__dirname, '../../../', targetPath)
);

function log(...args) {
  if (!silent) console.log(...args);
}

log(`📂 Running git status in: ${resolved}\n`);

try {
  const output = execSync('git status --porcelain', {
    cwd: resolved,
    encoding: 'utf-8',
  });

  const result = {
    modified: [],
    deleted: [],
    untracked: [],
  };

  output
    .split('\n')
    .filter(Boolean)
    .forEach(line => {
      const statusCode = line.slice(0, 2);
      const filePath = line.slice(3).trim();

      if (statusCode.includes('M')) {
        result.modified.push(filePath);
      } else if (statusCode.includes('D')) {
        result.deleted.push(filePath);
      } else if (statusCode.includes('?')) {
        result.untracked.push(filePath);
      }
    });

  const total =
    result.modified.length +
    result.deleted.length +
    result.untracked.length;

  log(`✅ ${total} fichier(s) détecté(s)`);
  log(`- modified: ${result.modified.length}`);
  log(`- deleted: ${result.deleted.length}`);
  log(`- untracked: ${result.untracked.length}`);

  const outFile = path.join(os.tmpdir(), `git-status-${process.pid}.json`);
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));

  log(`__OUTPUT_FILE__:${outFile}`);

  // Toujours output pour ton système même en silent
  if (silent) {
    console.log(`__OUTPUT_FILE__:${outFile}`);
  }

  process.exit(0);

} catch (error) {
  if (!silent) {
    console.error('❌ Failed to run git status');
    if (error.stderr) console.error(error.stderr.toString());
  }
  process.exit(1);
}