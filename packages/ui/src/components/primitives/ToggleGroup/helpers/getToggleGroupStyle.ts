import {
  getElevationTheme,
  getToneDefault,
  getToneTheme,
  mapThemeToCssVars,
} from "@workspace/ui/helpers";
import { ToggleGroupProps } from "../ToggleGroup.types";

type ToggleGroupStyleProps = Pick<
  ToggleGroupProps<string>,
  "tone" | "size" | "variant" | "style"
>;

/**
 * Génère l'objet de style CSS inline pour le composant ToggleGroup.
 *
 * Construit un ensemble de variables CSS personnalisées à partir des props
 * de thème et de taille, fusionnées avec les styles inline éventuellement
 * fournis par l'utilisateur.
 *
 * @param {ToggleGroupStyleProps} props - Les props de style du ToggleGroup.
 * @param {string} [props.tone] - La tonalité du groupe (ex : "primary", "neutral").
 *   Utilisée pour résoudre le thème de couleur via `getToneTheme`. Vaut "primary" par défaut.
 * @param {string} [props.variant] - La variante visuelle (ex : "solid", "outline").
 *   Utilisée pour résoudre le thème de couleur via `getToneTheme`. Vaut "default" par défaut.
 * @param {string} [props.size] - La taille des boutons. Réservé pour un usage futur.
 * @param {React.CSSProperties} [props.style] - Styles inline supplémentaires fournis par l'utilisateur.
 *   Appliqués en dernier et écrasent les variables CSS définies par défaut.
 *
 * @returns {React.CSSProperties} Un objet de styles contenant les variables CSS du thème
 *   ainsi que les variables de mise en forme (rayon, taille, espacement).
 *
 * @example
 * const style = getToggleGroupeStyle({ tone: "primary", variant: "solid" });
 * // Retourne :
 * // {
 * //   "--tg-color-...": "...",  // variables de thème
 * //   "--tg-radius-container": "10px",
 * //   "--tg-radius-button": "8px",
 * //   "--tg-font-size": "14px",
 * //   "--tg-padding-x": "14px",
 * //   "--tg-padding-y": "8px",
 * // }
 */
export const getToggleGroupeStyle = (
  props: ToggleGroupStyleProps,
): React.CSSProperties => {
  const theme = getToneDefault(props.tone ?? "primary");
  const elevationEffect = getElevationTheme(props.variant ?? "default");

  return {
    ...mapThemeToCssVars(theme, "tg"),
    ...mapThemeToCssVars(elevationEffect, "th"),

    // 📏 Rayon
    "--tg-radius-container": "10px",
    "--tg-radius-button": "8px",

    // 📐 Taille
    "--tg-font-size": "14px",
    "--tg-padding-x": "14px",
    "--tg-padding-y": "8px",

    ...props.style,
  } as React.CSSProperties;
};
