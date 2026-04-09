#!/usr/bin/env node

const { exec } = require('child_process');

const CONTAINER_NAME = 'menu_zen_mysql';
const MAX_WAIT_MS = 60_000;
const POLL_INTERVAL_MS = 3_000;

/**
 * Exécute une commande shell et retourne une Promise
 */
function execPromise(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout) => {
      if (error) reject(error);
      else resolve(stdout.trim());
    });
  });
}

/**
 * Vérifie si le container existe et retourne son état
 */
async function getContainerState() {
  try {
    const state = await execPromise(
      `docker inspect --format='{{.State.Status}}' ${CONTAINER_NAME}`
    );
    return state;
  } catch {
    return null; // container inexistant
  }
}

/**
 * Vérifie le healthcheck du container
 */
async function getContainerHealth() {
  try {
    const health = await execPromise(
      `docker inspect --format='{{.State.Health.Status}}' ${CONTAINER_NAME}`
    );
    return health;
  } catch {
    return null;
  }
}

/**
 * Vérifie si Docker tourne
 */
async function isDockerRunning() {
  try {
    await execPromise('docker info');
    return true;
  } catch {
    return false;
  }
}

async function main() {
  // 1. Vérifier que Docker est disponible
  if (!await isDockerRunning()) {
    console.error('❌ Docker is not running. Start it first with the start-docker action.');
    process.exit(1);
  }

  // 2. Vérifier l'état du container
  const state = await getContainerState();

  if (!state) {
    console.error(`❌ Container "${CONTAINER_NAME}" not found.`);
    console.log('💡 Make sure docker-compose is running (start-docker action).');
    process.exit(1);
  }

  if (state === 'running') {
    console.log(`✅ Container "${CONTAINER_NAME}" is already running`);
  } else {
    console.log(`⚠️  Container "${CONTAINER_NAME}" state: ${state}`);
    console.log('💡 Start docker-compose first with the start-docker action.');
    process.exit(1);
  }

  // 3. Attendre que le healthcheck passe
  console.log('⏳ Waiting for MySQL to be healthy...');
  const start = Date.now();

  while (Date.now() - start < MAX_WAIT_MS) {
    const health = await getContainerHealth();

    if (health === 'healthy') {
      console.log('✅ MySQL is healthy and ready');
      console.log(`   Host     : localhost:3306`);
      console.log(`   Database : menu_zen2`);
      console.log(`   User     : dev_user`);
      process.exit(0);
    }

    if (health === 'unhealthy') {
      console.error('❌ MySQL healthcheck failed');
      process.exit(1);
    }

    // health === 'starting' ou autre → on attend
    process.stdout.write('.');
    await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
  }

  console.error('\n❌ MySQL did not become healthy in time');
  process.exit(1);
}

main();