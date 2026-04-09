#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting apps/backend...');

const backendDir = path.join(__dirname, '../../apps/backend');

const child = spawn('pnpm', ['dev'], {
  cwd: backendDir,
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.error('❌ Failed to start backend:', error);
  process.exit(1);
});

child.on('exit', (code) => {
  console.log(`Backend exited with code ${code}`);
  process.exit(code || 0);
});

// Gestion propre de l'arrêt
process.on('SIGTERM', () => {
  console.log('Stopping backend...');
  child.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Stopping backend...');
  child.kill('SIGINT');
});