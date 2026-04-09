/**
 * Efface la console si le flag `--clear` est présent dans les args.
 *
 * @param {string[]} args - Arguments CLI (ex: process.argv)
 */
function clearConsole(args) {
  if (args.includes("--clear")) {
    process.stdout.write("\x1Bc");
  }
}

module.exports = { clearConsole };