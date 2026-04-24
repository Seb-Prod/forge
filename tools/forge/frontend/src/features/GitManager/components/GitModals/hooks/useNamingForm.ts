import { useEffect, useMemo, useState } from "react";
import { type NamingPreset } from "../components/BranchNamingFields/branchNaming.helper";

const STORAGE_KEY = "git.commit.preferences";

/**
 * Gère l'état d'un formulaire de nommage Git (branche ou commit).
 *
 * Persiste `type` et `scope` dans le `localStorage` et calcule
 * la valeur finale via le `preset` injecté.
 *
 * @param preset - Règles de formatage et de construction de la chaîne finale.
 */
export const useNamingForm = (preset: NamingPreset) => {
  /**
   * Récupère les valeurs initiales depuis le `localStorage`.
   * Retourne les valeurs par défaut si indisponible ou en cas d'erreur.
   */
  const getInitialValues = () => {
    if (typeof window === "undefined") {
      return { type: "feature", scope: "appFrontend" };
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored
        ? JSON.parse(stored)
        : { type: "feature", scope: "appFrontend" };
    } catch {
      return { type: "feature", scope: "appFrontend" };
    }
  };

  const [type, setType] = useState(() => getInitialValues().type);
  const [scope, setScope] = useState(() => getInitialValues().scope);
  const [description, setDescription] = useState("");

  /** Persiste `type` et `scope` à chaque modification. */
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ type, scope })
    );
  }, [type, scope]);

  /** Chaîne finale construite par le preset à partir des valeurs courantes. */
  const value = useMemo(() => {
    return preset.buildOutput({
      type,
      scope,
      description: preset.formatDescription(description),
    });
  }, [type, scope, description, preset]);

  /** Réinitialise `description` et restaure `type`/`scope` depuis le `localStorage`. */
  const reset = () => {
    const { type, scope } = getInitialValues();
    setType(type);
    setScope(scope);
    setDescription("");
  };

  return {
    type,
    scope,
    description,
    setType,
    setScope,
    setDescription,
    value,
    reset,
  };
};