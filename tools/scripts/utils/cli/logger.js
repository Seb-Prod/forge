function createLogger(silent) {
  function log(...messages) {
    if (!silent) process.stdout.write(messages.join(" ") + "\n");
  }
  return { log };
}

module.exports = { createLogger };