const path = require("path");
const os = require("os");
const fs = require("fs");

/**
 * Crée un contexte CLI encapsulant les arguments du processus et des utilitaires associés.
 *
 * @param {string[]} processArgs - Tableau d'arguments CLI (ex: process.argv.slice(2))
 * @returns {{ args, silent, getArgValue, log, resolveCwd, writeOutputFile }}
 *
 * @example
 * const ctx = createCLIContext(process.argv.slice(2));
 * const env = ctx.getArgValue("--env") ?? "development";
 * ctx.log("Environnement :", env);
 */
function createCLIContext(processArgs) {
  const args = processArgs;
  const silent = args.includes("--silent");

  /**
   * Retourne la valeur qui suit un flag nommé dans les args.
   *
   * @param {string} flag - Le flag à rechercher (ex: "--env")
   * @returns {string|null} La valeur suivante, ou null si absente ou si c'est un flag
   *
   * @example
   * // args: ["--env", "prod", "--silent"]
   * getArgValue("--env"); // → "prod"
   * getArgValue("--silent"); // → null (pas de valeur après)
   * getArgValue("--missing"); // → null
   */
  function getArgValue(flag) {
    const index = args.indexOf(flag);
    if (index !== -1 && args[index + 1] && !args[index + 1].startsWith("--")) {
      return args[index + 1];
    }
    return null;
  }

  /**
   * Écrit un message sur stdout, sauf si le mode silencieux est actif.
   *
   * @param {...*} messages - Valeurs à afficher, jointes par un espace
   */
  function log(...messages) {
    if (!silent) process.stdout.write(messages.join(" ") + "\n");
  }

  /**
   * Retourne le chemin absolu du répertoire de travail courant.
   *
   * @returns {string}
   */
  function resolveCwd() {
    return path.resolve(process.cwd());
  }

  /**
   * Sérialise `data` en JSON et l'écrit dans un fichier temporaire.
   * Émet `__OUTPUT_FILE__:{chemin}` sur stdout pour signaler l'emplacement.
   *
   * Le nom du fichier inclut le PID du processus pour éviter les collisions
   * lors d'exécutions parallèles : `{prefix}-{pid}.json`
   *
   * @param {string} prefix - Préfixe du nom de fichier (ex: "run", "output")
   * @param {*} data - Données à sérialiser (doit être compatible JSON)
   * @returns {string} Chemin absolu du fichier créé
   */
  function writeOutputFile(prefix, data) {
    const outFile = path.join(
      os.tmpdir(),
      `${prefix}-${process.pid}.json`
    );

    fs.writeFileSync(outFile, JSON.stringify(data, null, 2));

    if (silent) {
      process.stdout.write("__OUTPUT_FILE__:" + outFile + "\n");
    } else {
      log("__OUTPUT_FILE__:" + outFile);
    }

    return outFile;
  }

  return {
    /** @type {string[]} Référence au tableau d'arguments passé à la factory */
    args,
    /** @type {boolean} True si --silent est présent dans les args */
    silent,
    getArgValue,
    log,
    resolveCwd,
    writeOutputFile,
  };
}

module.exports = { createCLIContext };