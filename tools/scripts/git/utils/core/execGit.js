const { execSync } = require("child_process");

/**
 * Exécute une commande git de façon standardisée
 */
function execGit(cli, cmd, options = {}) {
  const res = cli.safeExec(
    () => {
      const out = execSync(cmd, {
        encoding: "utf-8",
        stdio: options.stdio || "pipe",
        cwd: options.cwd,
        maxBuffer: 1024 * 1024 * 10,
      });

      return (out ?? "").toString().trim();
    },
    options.errorMessage || "Git command failed",
  );

  if (res === null || res === undefined) {
    throw new Error(`Git command returned empty result: ${cmd}`);
  }

  return res;
}

module.exports = execGit;