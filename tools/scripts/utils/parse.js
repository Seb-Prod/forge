/**
 * Parse une chaîne JSON provenant d'un argument CLI.
 *
 * Cette fonction encapsule `JSON.parse` avec `cli.safeExec`
 * afin de gérer proprement les erreurs sans faire crasher
 * l'application.
 *
 * @param {ReturnType<import('../../utils/cli').createCLIContext>} cli
 * Contexte CLI contenant les helpers (safeExec, log, pushError, etc.)
 *
 * @param {string} value
 * Chaîne JSON à parser (ex: '{"key":"value"}')
 *
 * @param {string} [errorMessage="Invalid JSON argument"]
 * Message d'erreur personnalisé en cas d'échec du parsing
 *
 * @returns {any | null}
 * Objet JavaScript parsé ou `null` si une erreur survient
 *
 * @example
 * const data = parseJSONArg(cli, '{"name":"John"}');
 * // → { name: "John" }
 *
 * @example
 * const invalid = parseJSONArg(cli, '{name: John}');
 * // → null + erreur gérée par le CLI
 */
function parseJSONArg(cli, value, errorMessage = "Invalid JSON argument") {
  return cli.safeExec(() => {
    const parsed = JSON.parse(value);
    return parsed;
  }, errorMessage);
}

module.exports = { parseJSONArg };