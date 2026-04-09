#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const targetPath = process.argv[2] || '';
const resolved = path.resolve(path.join(__dirname, '../../../', targetPath));

console.log(`📂 Listing directory: ${resolved}\n`);

if (!fs.existsSync(resolved)) {
  console.error(`❌ Directory not found: ${resolved}`);
  process.exit(1);
}

function listDirs(dirPath, depth = 0) {
  let entries;
  try {
    entries = fs.readdirSync(dirPath, { withFileTypes: true });
  } catch (error) {
    console.error(`❌ Failed to read directory: ${error.message}`);
    return [];
  }

  const dirs = entries.filter(e => e.isDirectory());
  const result = [];

  dirs.forEach(entry => {
    const fullPath = path.join(dirPath, entry.name);
    result.push({ name: entry.name, type: 'directory', path: fullPath, depth });
    const children = listDirs(fullPath, depth + 1);
    result.push(...children);
  });

  return result;
}

const allDirs = listDirs(resolved);

console.log(`\n✅ ${allDirs.length} répertoire(s) trouvé(s) au total`);
const os = require('os');
const outFile = path.join(os.tmpdir(), `action-${process.pid}.json`);
fs.writeFileSync(outFile, JSON.stringify(allDirs));
console.log(`__OUTPUT_FILE__:${outFile}`);
process.exit(0);
