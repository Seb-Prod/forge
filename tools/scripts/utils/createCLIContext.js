const { createSafeExec } = require("./safeExec");
const { createArgUtils } = require("./cli/argUtils");
const { createLogger } = require("./cli/logger");
const { createOutputUtils } = require("./cli/outputUtils");

function createCLIContext(processArgs, commandName = "unknown-command") {
  const args = processArgs;
  const silent = args.includes("--silent");

  const state = {
    messages: [],
    hasFatalError: false,
  };

  const safeExec = createSafeExec(state);
  const { log } = createLogger(silent);
  const { getArgValue, parseJSONArg, validateArgs } = createArgUtils(
    args,
    safeExec,
  );
  const { writeOutputFile, exitWithResult, resolveCwd } = createOutputUtils(
    commandName,
    state,
    log,
  );

  function pushError(message, fatal = false) {
    state.messages.push(message);
    if (fatal) state.hasFatalError = true;
  }

  return {
    args,
    silent,
    get hasFatalError() {
      return state.hasFatalError;
    },
    get messages() {
      return state.messages;
    },
    log,
    safeExec,
    pushError,
    getArgValue,
    parseJSONArg,
    validateArgs,
    writeOutputFile,
    exitWithResult,
    resolveCwd
  };
}

module.exports = { createCLIContext };
