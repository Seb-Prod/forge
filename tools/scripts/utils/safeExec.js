/**
 * Crée un safeExec lié à un contexte d'erreurs.
 *
 * @param {object} ctx - Contexte partagé { messages, hasFatalError }
 * @returns {Function}
 */
function createSafeExec(ctx) {
  return function safeExec(fn, errorMessage) {
    try {
      return fn();
    } catch (err) {
      ctx.messages.push(errorMessage + ": " + err.message);
      ctx.hasFatalError = true;
      return null;
    }
  };
}

module.exports = { createSafeExec };