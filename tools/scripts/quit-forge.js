#!/usr/bin/env node

const http = require('http');

console.log('🛑 Sending shutdown signal to Forge...');

const options = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/shutdown',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('✅ Shutdown signal sent');
    console.log('👋 Forge is shutting down...');
    
    // Attendre un peu puis forcer l'arrêt du processus parent
    setTimeout(() => {
      // Trouver et tuer le processus concurrently
      const { exec } = require('child_process');
      exec('pkill -f "concurrently.*forge"', (error) => {
        if (!error) {
          console.log('✅ Forge stopped');
        }
        process.exit(0);
      });
    }, 1000);
  });
});

req.on('error', (error) => {
  console.error('❌ Failed to send shutdown signal:', error.message);
  console.log('💡 Make sure Forge is running on http://localhost:3001');
  process.exit(1);
});

req.end();