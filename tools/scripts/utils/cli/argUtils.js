function createArgUtils(args, safeExec) {
  function getArgValue(flag) {
    const index = args.indexOf(flag);
    if (index !== -1 && args[index + 1] && !args[index + 1].startsWith("--")) {
      return args[index + 1];
    }
    return null;
  }

  function parseJSONArg(value, errorMessage = "Invalid JSON argument") {
    return safeExec(() => JSON.parse(value), errorMessage);
  }

  function validateArgs(requiredFlags = []) {
    const errors = [];
    const values = {};

    for (const flag of requiredFlags) {
      const value = getArgValue(flag);

      if (!value) {
        errors.push(`Missing required argument: ${flag}`);
      } else {
        // normalisation "--branch" -> "branch"
        const key = flag.replace(/^--/, "");
        values[key] = value;
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      values,
    };
  }

  return { getArgValue, parseJSONArg, validateArgs };
}

module.exports = { createArgUtils };
