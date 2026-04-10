import { Text } from "@workspace/ui";

/**
 * TYPES de commits (Conventional Commits)
 *
 * Utilisés pour décrire la nature du changement.
 * Format : <type>(<scope>): <message>
 *
 * Exemple :
 * feat(frontend): add login page
 */
const TYPES = [
  "feat",     // ✨ Nouvelle fonctionnalité
  "fix",      // 🐛 Correction de bug
  "docs",     // 📝 Documentation uniquement
  "refactor", // ♻️ Refactorisation sans changement fonctionnel
  "chore",    // 🔧 Tâches techniques (build, config, maintenance)
  "test",     // ✅ Ajout ou modification de tests
  "perf",     // ⚡ Amélioration des performances
  "ci"        // 👷 Intégration continue / pipelines
];

/**
 * SCOPES de commits
 *
 * Représentent la zone impactée dans le monorepo.
 * Chaque scope correspond à un dossier ou un sous-module.
 *
 * Structure du repo :
 * - apps/        → frontend, backend
 * - packages/    → ui, functions, styles
 * - tools/forge  → forge + sous-modules
 * - tools/       → scripts
 * - docs/, images/
 *
 * Convention :
 * - noms courts et explicites
 * - kebab-case
 * - hiérarchie avec tiret pour les sous-modules (ex: forge-frontend)
 *
 * Exemple :
 * fix(forge-backend): handle error on project creation
 */
const SCOPES = [
  // ===== Apps =====
  "frontend",        // Application React (Vite + TS)
  "backend",         // API Node.js (Express + Sequelize)

  // ===== Packages =====
  "ui",              // Librairie de composants React (@workspace/ui)
  "functions",       // Utilitaires TypeScript (@workspace/functions)
  "styles",          // Styles globaux (@workspace/styles)

  // ===== Forge (outil monorepo interne) =====
  "forge",           // Scope global Forge
  "forge-frontend",  // Interface utilisateur de Forge
  "forge-backend",   // Logique backend de Forge
  "forge-template",  // Templates générés par Forge

  // ===== Tools =====
  "scripts",         // Scripts internes (CLI, automatisation)

  // ===== Global / transverse =====
  "repo",            // Changements globaux du monorepo
  "config",          // Configuration (eslint, tsconfig, vite, etc.)
  "deps",            // Dépendances (maj, ajout, suppression)

  // ===== Documentation & assets =====
  "docs",            // Documentation
  "images"           // Images / assets statiques
];

/**
 * Props du composant `BranchNamingFields`.
 */
interface BranchNamingFieldsProps {
  /** Type de la branche (ex: `feature`, `fix`). */
  type: string;

  /** Scope ciblé par la branche (ex: `appFrontend`, `packagesUi`). */
  scope: string;

  /** Description courte saisie par l'utilisateur. */
  description: string;

  /** Désactive les champs pendant un chargement. */
  isLoading: boolean;

  /** Callback déclenché lors du changement de type. */
  onTypeChange: (value: string) => void;

  /** Callback déclenché lors du changement de scope. */
  onScopeChange: (value: string) => void;

  /** Callback déclenché lors du changement de description. */
  onDescriptionChange: (value: string) => void;

  /**
   * Preset définissant les règles de formatage et de construction du nom de branche.
   */
  preset: {
    /**
     * Formate la description brute (ex: kebab-case, suppression des caractères spéciaux).
     * @param value - Description brute saisie par l'utilisateur.
     * @returns Description formatée.
     */
    formatDescription: (value: string) => string;

    /**
     * Construit le nom de branche final.
     * @param params - Objet contenant `type`, `scope` et `description` formatée.
     * @returns Nom de branche complet (ex: `feature/appFrontend/add-login-page`).
     */
    buildOutput: (params: {
      type: string;
      scope: string;
      description: string;
    }) => string;
  };
}

/**
 * Champs de formulaire pour la construction d'un nom de branche Git structuré.
 *
 * Affiche trois contrôles (type, scope, description) et un aperçu en temps réel
 * du nom de branche généré via le `preset` injecté. Ce composant est purement
 * présentationnel : il ne gère aucun état propre et ne produit aucun effet de bord.
 *
 * @example
 * ```tsx
 * <BranchNamingFields
 *   type="feature"
 *   scope="appFrontend"
 *   description="add login page"
 *   isLoading={false}
 *   onTypeChange={setType}
 *   onScopeChange={setScope}
 *   onDescriptionChange={setDescription}
 *   preset={branchNamingPresets.branch}
 * />
 * ```
 */
export const BranchNamingFields = ({
  type,
  scope,
  description,
  isLoading,
  onTypeChange,
  onScopeChange,
  onDescriptionChange,
  preset,
}: BranchNamingFieldsProps) => {
  const preview = preset.buildOutput({
    type,
    scope,
    description: preset.formatDescription(description),
  });

  return (
    <>
      {/* TYPE */}
      <div>
        <label style={{ fontSize: 12 }}>Type</label>
        <select
          value={type}
          onChange={(e) => onTypeChange(e.target.value)}
          disabled={isLoading}
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* SCOPE */}
      <div>
        <label style={{ fontSize: 12 }}>Scope</label>
        <select
          value={scope}
          onChange={(e) => onScopeChange(e.target.value)}
          disabled={isLoading}
        >
          {SCOPES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* DESCRIPTION */}
      <div>
        <label style={{ fontSize: 12 }}>Description</label>
        <input
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          disabled={isLoading}
        />
      </div>

      {/* PREVIEW */}
      <Text size="xs">Preview : {preview}</Text>
    </>
  );
};