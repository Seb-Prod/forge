import { Text } from "@workspace/ui";
import { COMMIT_TYPE_LIST, SCOPE_LIST } from "../../../../constants/commits";

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
     */
    formatDescription: (value: string) => string;

    /**
     * Construit le nom de branche final (ex: `feature/appFrontend/add-login-page`).
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
 * Composant purement présentationnel : pas d'état propre ni d'effets de bord.
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
          {COMMIT_TYPE_LIST.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
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
          {SCOPE_LIST.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
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