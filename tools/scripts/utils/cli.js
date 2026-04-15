const { createSafeExec } = require("./safeExec");

const path = require("path");
const os = require("os");
const fs = require("fs");

/**
 * Crée un contexte CLI (args, logs, erreurs, utilitaires).
 *
 * @param {string[]} processArgs - ex: process.argv
 *
 * @example
 * const cli = createCLIContext(process.argv);
 * const env = cli.getArgValue("--env");
 * if (!env) cli.pushError("Missing --env");
 * if (cli.hasFatalError) cli.exitWithResult("run", { success: false });
 */
function createCLIContext(processArgs, commandName = "unknown-command") {
  const args = processArgs;
  const silent = args.includes("--silent");

  const state = {
    messages: [],
    hasFatalError: false,
  };

  const safeExec = createSafeExec(state);

  /**
   * Enregistre une erreur dans les messages.
   *
   * @param {string} message
   * @param {boolean} [fatal=true] - Si true, bloque la suite du script
   */
  function pushError(message, fatal = false) {
    state.messages.push(message);
    if (fatal) state.hasFatalError = true;
  }

  /**
   * Écrit le fichier de sortie et termine le process.
   *
   * @param {object} data - Données à sérialiser
   */
  function exitWithResult(data) {
    log(state.messages)
    writeOutputFile(commandName, { ...data, messages: state.messages });
    process.exit(0);
  }

  /**
   * Retourne la valeur qui suit un flag dans les args.
   *
   * @param {string} flag - ex: "--env"
   * @returns {string | null}
   *
   * @example
   * // args: ["--env", "prod", "--silent"]
   * getArgValue("--env")    // → "prod"
   * getArgValue("--silent") // → null
   * getArgValue("--missing")// → null
   */
  function getArgValue(flag) {
    const index = args.indexOf(flag);
    if (index !== -1 && args[index + 1] && !args[index + 1].startsWith("--")) {
      return args[index + 1];
    }
    return null;
  }

  /**
   * Écrit sur stdout, sauf en mode silencieux.
   *
   * @param {...any} messages
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
   * Sérialise `data` en JSON dans un fichier temporaire et émet son chemin sur stdout.
   *
   * @param {string} prefix - Préfixe du nom de fichier (ex: "git-commit")
   * @param {any} data
   * @returns {string} Chemin absolu du fichier créé
   */
  function writeOutputFile(prefix, data) {
    const outFile = path.join(os.tmpdir(), `${prefix}-${process.pid}.json`);

    fs.writeFileSync(outFile, JSON.stringify(data, null, 2));

    if (silent) {
      process.stdout.write("__OUTPUT_FILE__:" + outFile + "\n");
    } else {
      log("__OUTPUT_FILE__:" + outFile);
    }

    return outFile;
  }

  /**
   * Parse une string JSON en valeur JS.
   * Enregistre une erreur fatale si le parsing échoue.
   *
   * @param {string} value - String JSON à parser
   * @param {string} [errorMessage="Invalid JSON argument"]
   * @returns {any | null}
   */
  function parseJSONArg(value, errorMessage = "Invalid JSON argument") {
    return safeExec(() => JSON.parse(value), errorMessage);
  }

  return {
    /** @type {string[]} */
    args,
    /** @type {boolean} */
    silent,
    /** @type {boolean} */
    get hasFatalError() { return state.hasFatalError; },
    /** @type {string[]} */
    get messages() { return state.messages; },
    getArgValue,
    log,
    resolveCwd,
    writeOutputFile,
    safeExec,
    pushError,
    exitWithResult,
    parseJSONArg,
  };
}

module.exports = { createCLIContext };