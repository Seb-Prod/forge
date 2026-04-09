#!/usr/bin/env node

console.log('Hello World !');

let count = 0;

const interval = setInterval(() => {
  count++;
  console.log(`Script is running... (${count})`);

  if (count === 3) {
    console.log('Goodbye!');
    clearInterval(interval);
    process.exit(0);
  }
}, 5000);

process.on('SIGTERM', () => {
  console.log('Goodbye! (SIGTERM)');
  clearInterval(interval);
  process.exit(0);
});