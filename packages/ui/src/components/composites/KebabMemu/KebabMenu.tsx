import { useEffect, useRef, useState } from "react";
import { FaEllipsisV } from "react-icons/fa";
import styles from "./KebabMenu.module.css";
import { createPortal } from "react-dom";

/**
 * Menu contextuel générique déclenché par un bouton ⋮ (kebab).
 *
 * Le menu est rendu via un portail dans `document.body` afin d'éviter
 * tout problème de découpage lié à `overflow: hidden` ou `z-index` dans
 * l'arbre parent. Il se repositionne automatiquement (flip vertical et
 * horizontal) si l'espace disponible à l'écran est insuffisant.
 *
 * Fermeture déclenchée :
 * - au clic en dehors du bouton déclencheur et du menu,
 * - à la touche `Escape`.
 *
 * @remarks
 * Composant en cours de développement — les props suivantes sont prévues
 * avant stabilisation dans `@workspace/ui` :
 * - `icon` : remplacer l'icône ⋮ par défaut
 * - `size` : taille du bouton déclencheur
 * - `offset` : décalage entre le bouton et le menu
 *
 * **Limitations connues :**
 * - La hauteur du menu est estimée (`actions.length × 40 px`) ; elle peut
 *   être inexacte avec des labels longs ou des icônes. Une mesure post-rendu
 *   est prévue.
 * - `transformOrigin` est calculé mais pas encore appliqué au menu,
 *   ce qui peut affecter les animations d'entrée/sortie.
 */
export interface KebabAction {
  /** Texte affiché dans l'item. Sert aussi de clé React — doit être unique dans la liste. */
  label: string;
  /** Icône affichée à gauche du label (tout `ReactNode` : SVG, composant, emoji…). */
  icon?: React.ReactNode;
  /** Callback déclenché au clic, sauf si `disabled` est `true`. */
  onClick?: () => void;
  /** Désactive l'item : le clic est ignoré et le style `disabled` est appliqué. */
  disabled?: boolean;
  /**
   * Variante visuelle de l'item.
   * - `"default"` : style standard.
   * - `"danger"` : texte en rouge, pour les actions destructrices (suppression…).
   * @defaultValue `"default"`
   */
  variant?: "default" | "danger";
}

interface KebabMenuProps {
  /** Liste des actions affichées dans le menu. */
  actions: KebabAction[];
  /**
   * Alignement horizontal du menu par rapport au bouton déclencheur.
   * - `"right"` : le bord droit du menu s'aligne sur le bord droit du bouton.
   * - `"left"` : le bord gauche du menu s'aligne sur le bord gauche du bouton.
   *
   * Dans les deux cas, le menu est retourné automatiquement si l'espace
   * disponible est insuffisant.
   * @defaultValue `"right"`
   */
  align?: "left" | "right";
}
export interface KebabAction {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "default" | "danger";
  
}

interface KebabMenuProps {
  actions: KebabAction[];
  align?: "left" | "right";
}

export const KebabMenu = ({ actions, align="right" }: KebabMenuProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({

  top: 0,

  left: 0,

  transformOrigin: "top left",

});

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleActionClick = (action: KebabAction) => {
    if (action.disabled) return;
    action.onClick?.();
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className={styles.menuWrapper}>
      <button
        className={styles.menuButton}
       onClick={(e) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();

  const menuWidth = 180; // approx ou fixe via CSS
  const menuHeight = actions.length * 40; // estimation

  let top = rect.bottom + window.scrollY;
  let left =

  align === "right"

    ? rect.right + window.scrollX - menuWidth

    : rect.left + window.scrollX;
  let transformOrigin = "top left";

  // 🔁 flip vertical
  if (top + menuHeight > window.innerHeight) {
    top = rect.top + window.scrollY - menuHeight;
    transformOrigin = "bottom left";
  }

  // 🔁 flip horizontal
  if (left + menuWidth > window.innerWidth) {
    left = rect.right + window.scrollX - menuWidth;
    transformOrigin = transformOrigin.replace("left", "right");
  }

  setPosition({ top, left, transformOrigin });
  setOpen((prev) => !prev);
}}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Actions"
      >
        <FaEllipsisV />
      </button>

      {open &&
        createPortal(
          <div className={styles.menu} style={{

    position: "absolute",

    top: position.top,

    left: position.left,

    zIndex: 9999,

  }}>
            {actions.map((action) => (
              <button
                key={action.label}
                onClick={() => handleActionClick(action)}
                disabled={action.disabled}
                className={`${styles.menuItem} ${
                  action.variant === "danger" ? styles.danger : ""
                }`}
              >
                {action.icon}
                {action.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </div>
  );
};
