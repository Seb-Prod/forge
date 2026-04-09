import { RefObject, useEffect, useRef } from "react";

/**
 * Sauvegarde le focus actuel et le restaure après fermeture.
 * Gère aussi le focus trap à l'intérieur de l'élément.
 * 
 * @param elementRef - Ref de l'élément qui doit capturer le focus
 * @param isActive - État qui détermine si le focus doit être géré
 * @param autoFocus - Focus automatiquement le premier élément focusable
 * 
 * @example
 * ```tsx
 * function Modal({ isOpen }) {
 *   const modalRef = useRef<HTMLDivElement>(null);
 *   useRestoreFocus(modalRef, isOpen);
 *   return <div ref={modalRef}>...</div>;
 * }
 * ```
 */

export function useRestoreFocus<T extends HTMLElement>(
  elementRef: RefObject<T>,
  isActive: boolean,
  autoFocus: boolean = true,
): void {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const element = elementRef.current;
    if (!element) return;

    // Sauvegarde de l'élément actuellement focus
    previousActiveElement.current = document.activeElement as HTMLElement;

    if (autoFocus) {
      // Focus le premier élément focusable
      const focusableElements = element.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])',
      );

      if (focusableElements && focusableElements.length > 0) {
        // Petit délai pour que l'animation du dialog soit visible
        requestAnimationFrame(() => {
          const firstElement = focusableElements[0];
          if (firstElement && typeof firstElement.focus === 'function') {
            firstElement.focus();
          }
        });
      }
    }

    // Cleanup - restaure le focus
    return () => {
      const previousElement = previousActiveElement.current;
      if (previousElement && typeof previousElement.focus === 'function') {
        // Petit délai pour éviter les conflits avec les animations de fermeture
        requestAnimationFrame(() => {
          try {
            previousElement.focus();
          } catch (e) {
            // L'élément n'existe peut-être plus dans le DOM
            console.warn('Failed to restore focus:', e);
          }
        });
      }
    };
  }, [isActive, elementRef, autoFocus]);
}