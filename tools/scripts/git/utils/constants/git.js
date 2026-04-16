/**
 * Liste des branches protégées (interdites pour certaines opérations)
 */
const PROTECTED_BRANCHES = [
  "main",
  "master",
  "develop",
];

module.exports = {
  PROTECTED_BRANCHES,
};