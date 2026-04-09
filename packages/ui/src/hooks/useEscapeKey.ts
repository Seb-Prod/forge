import { useEffect } from "react";

/**
 * Écoute la touche Escape et appelle un callback.
 * 
 * @param isEnabled - Active/désactive l'écoute de la touche Escape
 * @param onEscape - Callback appelé quand Escape est pressé (optionnel)
 * @param isDisabled - Désactive complètement le hook même si isEnabled est true
 * 
 * @example
 * ```tsx
 * function Modal({ isOpen, onClose }) {
 *   useEscapeKey(isOpen, onClose);
 *   return <div>...</div>;
 * }
 * ```
 */
export function useEscapeKey(
  isEnabled: boolean,
  onEscape?: () => void,
  isDisabled: boolean = false,
): void {
  useEffect(() => {
    if (!isEnabled || isDisabled || !onEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onEscape();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isEnabled, onEscape, isDisabled]);
}