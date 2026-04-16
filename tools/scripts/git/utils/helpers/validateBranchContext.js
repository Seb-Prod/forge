const { PROTECTED_BRANCHES } = require("../constants/git");

/**
 * Valide le contexte de branche Git selon des règles configurables.
 *
 * Permet de vérifier indépendamment :
 * - la correspondance entre la branche courante et une branche cible
 * - l'appartenance à une liste de branches protégées
 *
 * Chaque règle est optionnelle pour permettre une réutilisation flexible
 * dans différents scripts (squash, rebase, delete, etc.).
 *
 * @param {object} cli
 * @param {object} options
 * @param {string} options.currentBranch
 * @param {string} [options.targetBranch]
 * @param {boolean} [options.enforceMatch=false]
 * @param {string[]} [options.protectedBranches=[]]
 * @param {boolean} [options.checkProtected=false]
 *
 * @returns {{
 *   success: boolean,
 *   errors: string[]
 * }}
 *
 * @example
 * validateBranchContext(cli, {
 *   currentBranch,
 *   targetBranch: branch,
 *   enforceMatch: true,
 * });
 */
function validateBranchContext(cli, options) {
  const {
    currentBranch,
    targetBranch,
    enforceMatch = false,
    protectedBranches = PROTECTED_BRANCHES,
    checkProtected = false,
  } = options;

  const errors = [];

  // Vérifie les branches protégées
  if (checkProtected && protectedBranches.includes(currentBranch)) {
    const msg = `Cannot operate on protected branch: ${currentBranch}`;
    errors.push(msg);
  }

  // Vérifie correspondance branche courante / cible
  if (enforceMatch && currentBranch !== targetBranch) {
    const msg = `You are on "${currentBranch}", expected "${targetBranch}"`;
    errors.push(msg);
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

module.exports = validateBranchContext;