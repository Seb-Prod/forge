#!/usr/bin/env node

process.stdout.write('\x1Bc');

process.on('SIGTERM', () => {
  process.exit(0);
});