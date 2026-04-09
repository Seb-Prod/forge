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

try {
  const head = execSync('git rev-parse HEAD', {
    cwd: resolved,
    encoding: 'utf-8',
  }).trim();

  const result = head;

  const outFile = path.join(os.tmpdir(), 'git-head-' + process.pid + '.json');
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));

  if (silent) {
    console.log('__OUTPUT_FILE__:' + outFile);
  } else {
    console.log(`HEAD: ${head}`);
    console.log('__OUTPUT_FILE__:' + outFile);
  }

  process.exit(0);
} catch (error) {
  if (!silent) {
    console.error('❌ Failed to get HEAD');
  }
  process.exit(1);
}