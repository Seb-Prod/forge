/**
 * Paramètres communs utilisés pour construire un nom de branche ou un message de commit.
 */
export type NamingParams = {
  /** Type conventionnel (ex: `feature`, `fix`, `docs`). */
  type: string;
  /** Scope ciblé (ex: `appFrontend`, `packagesUi`). */
  scope: string;
  /** Description formatée de la modification. */
  description: string;
};

/**
 * Preset de nommage définissant les règles de formatage et de construction
 * propres à un contexte Git (branche ou commit).
 */
export type NamingPreset = {
  /**
   * Formate la description brute saisie par l'utilisateur.
   * @param value - Description brute.
   * @returns Description nettoyée et normalisée.
   */
  formatDescription: (value: string) => string;

  /**
   * Construit la chaîne finale (nom de branche ou message de commit).
   * @param params - Objet contenant type, scope et description formatée.
   * @returns Chaîne finale prête à l'emploi.
   */
  buildOutput: (params: NamingParams) => string;
};

/**
 * Clés de presets disponibles.
 */
type PresetKey = "commit" | "branch";

/**
 * Applique un formatage de base commun à toutes les descriptions :
 * mise en minuscules, trim, et suppression des caractères spéciaux.
 *
 * @param value - Valeur brute à normaliser.
 * @returns Valeur nettoyée.
 */
const baseFormat = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "");

/**
 * Formate une description pour un message de commit.
 * Applique uniquement le formatage de base.
 */
const formatCommitDescription = (value: string): string =>
  baseFormat(value);

/**
 * Construit un message de commit selon la convention `type(scope): description`.
 * @example `feature(appFrontend): add login page`
 */
const buildCommitMessage = ({ type, scope, description }: NamingParams): string =>
  `${type}(${scope}): ${description}`;

/**
 * Formate une description pour un nom de branche.
 * Applique le formatage de base et remplace les espaces par des tirets.
 */
const formatBranchDescription = (value: string): string =>
  baseFormat(value).replace(/\s+/g, "-");

/**
 * Construit un nom de branche selon la convention `type/scope-description`.
 * @example `feature/appFrontend-add-login-page`
 */
const buildBranchName = ({ type, scope, description }: NamingParams): string =>
  `${type}/${scope}-${description}`;

/**
 * Presets de nommage prêts à l'emploi pour les contextes Git courants.
 *
 * @example
 * ```ts
 * const name = branchNamingPresets.branch.buildOutput({
 *   type: "feature",
 *   scope: "appFrontend",
 *   description: branchNamingPresets.branch.formatDescription("Add login page"),
 * });
 * // → "feature/appFrontend-add-login-page"
 * ```
 */
export const branchNamingPresets: Record<PresetKey, NamingPreset> = {
  commit: {
    formatDescription: formatCommitDescription,
    buildOutput: buildCommitMessage,
  },
  branch: {
    formatDescription: formatBranchDescription,
    buildOutput: buildBranchName,
  },
};