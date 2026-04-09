let hasFatalError = false;
let messages = [];

function safeExec(fn, errorMessage) {
  try {
    return fn();
  } catch (err) {
    messages.push(errorMessage + ": " + err.message);
    hasFatalError = true;
    return null;
  }
}

module.exports = { safeExec, messages, hasFatalError };