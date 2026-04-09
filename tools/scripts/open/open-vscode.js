#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

console.log('🔧 Opening VSCode...');

const projectRoot = path.join(__dirname, '../../..');

// Ouvrir VSCode dans le répertoire du projet
exec(`code "${projectRoot}"`, (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Failed to open VSCode:', error.message);
    console.log('💡 Make sure VSCode is installed and the "code" command is available in your PATH');
    console.log('   Run: Open VSCode > Cmd+Shift+P > "Shell Command: Install code command in PATH"');
    process.exit(1);
  }
  
  if (stderr) {
    console.error('⚠️  Warning:', stderr);
  }
  
  console.log('✅ VSCode opened successfully');
  process.exit(0);
});