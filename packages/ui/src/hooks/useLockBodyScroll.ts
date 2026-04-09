import { useEffect } from "react";

/**
 * Bloque le scroll du body quand un élément (dialog, drawer, etc.) est ouvert.
 * 
 * @param isLocked - État qui détermine si le scroll doit être bloqué
 * 
 * @example
 * ```tsx
 * function Modal({ isOpen }) {
 *   useLockBodyScroll(isOpen);
 *   return <div>...</div>;
 * }
 * ```
 */

export function useLockBodyScroll(isLocked: boolean): void {
  useEffect(() => {
    if (!isLocked) return;

    // Sauvegarde de l'état actuel
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    // Calcul du padding pour compenser la scrollbar
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // Application du lock
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Cleanup - restauration de l'état
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isLocked]);
}