const path = require("path");
const os = require("os");
const fs = require("fs");

function createOutputUtils(commandName, state, log) {
  function writeOutputFile(prefix, data) {
    const outFile = path.join(os.tmpdir(), `${prefix}-${process.pid}.json`);
    fs.writeFileSync(outFile, JSON.stringify(data, null, 2));

    const marker = "__OUTPUT_FILE__:" + outFile + "\n";
    process.stdout.write(marker);

    return outFile;
  }

  function exitWithResult(data) {
    log(state.messages);
    writeOutputFile(commandName, { ...data, messages: state.messages });
    process.exit(0);
  }

  function resolveCwd() {
    return path.resolve(process.cwd());
  }

  return { writeOutputFile, exitWithResult, resolveCwd };
}

module.exports = { createOutputUtils };
