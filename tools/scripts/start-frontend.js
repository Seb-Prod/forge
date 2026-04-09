#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting apps/frontend...');

const frontendDir = path.join(__dirname, '../../apps/frontend');

const child = spawn('pnpm', ['dev'], {
  cwd: frontendDir,
  stdio: 'inherit',
  shell: true
});

child.on('error', (error) => {
  console.error('❌ Failed to start frontend:', error);
  process.exit(1);
});

child.on('exit', (code) => {
  console.log(`Frontend exited with code ${code}`);
  process.exit(code || 0);
});

// Gestion propre de l'arrêt
process.on('SIGTERM', () => {
  console.log('Stopping frontend...');
  child.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('Stopping frontend...');
  child.kill('SIGINT');
});