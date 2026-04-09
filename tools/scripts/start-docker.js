#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const path = require('path');

const projectRoot = path.join(__dirname, '../..');

function execPromise(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) reject(error);
      else resolve(stdout.trim());
    });
  });
}

async function isDockerRunning() {
  try {
    await execPromise('docker info');
    return true;
  } catch {
    return false;
  }
}

async function startDockerDesktop() {
  console.log('🐳 Docker Desktop is not running, starting it...');
  await execPromise('open -a Docker');

  const MAX_WAIT_MS = 60_000;
  const POLL_INTERVAL_MS = 3_000;
  const start = Date.now();

  while (Date.now() - start < MAX_WAIT_MS) {
    await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
    if (await isDockerRunning()) {
      console.log('✅ Docker Desktop is ready');
      return;
    }
    process.stdout.write('.');
  }

  console.error('\n❌ Docker Desktop did not start in time');
  process.exit(1);
}

async function waitForMySQL() {
  const MAX_WAIT_MS = 60_000;
  const POLL_INTERVAL_MS = 3_000;
  const start = Date.now();

  console.log('⏳ Waiting for MySQL to be healthy...');

  while (Date.now() - start < MAX_WAIT_MS) {
    try {
      const health = await execPromise(
        `docker inspect --format='{{.State.Health.Status}}' menu_zen_mysql`
      );
      if (health === 'healthy') {
        console.log('✅ MySQL is healthy and ready');
        console.log('   Host      : localhost:3306');
        console.log('   Database  : menu_zen2');
        console.log('   User      : dev_user');
        console.log('   PhpMyAdmin → http://localhost:8081');
        return;
      }
      if (health === 'unhealthy') {
        console.error('❌ MySQL healthcheck failed');
        process.exit(1);
      }
    } catch {
      // container pas encore dispo, on attend
    }
    process.stdout.write('.');
    await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
  }

  console.error('\n❌ MySQL did not become healthy in time');
  process.exit(1);
}

async function main() {
  // 1. S'assurer que Docker tourne
  if (await isDockerRunning()) {
    console.log('✅ Docker Desktop is already running');
  } else {
    await startDockerDesktop();
  }

  // 2. Lancer docker-compose
  // Le process reste en vie tant que compose tourne
  // → ActionManager voit le process comme "running"
  console.log('🚀 Starting services (docker-compose up)...');

  const child = spawn('docker-compose', ['up', '-d'], {
    cwd: projectRoot,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true
  });

  child.stdout?.on('data', (data) => {
    process.stdout.write(data);
  });

  child.stderr?.on('data', (data) => {
    process.stderr.write(data);
  });

  child.on('error', (error) => {
    console.error('❌ Failed to start docker-compose:', error.message);
    process.exit(1);
  });

  child.on('exit', (code) => {
    console.log(`\ndocker-compose exited with code ${code}`);
    process.exit(code || 0);
  });

  // 3. En parallèle, attendre que MySQL soit healthy
  await waitForMySQL();

  // 4. Propagation propre des signaux vers docker-compose
  process.on('SIGTERM', () => {
    console.log('\n🛑 Stopping services...');
    child.kill('SIGTERM');
  });

  process.on('SIGINT', () => {
    console.log('\n🛑 Stopping services...');
    child.kill('SIGINT');
  });
}

main();