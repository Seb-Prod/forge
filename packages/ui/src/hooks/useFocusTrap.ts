import { RefObject, useEffect } from "react";

/**
 * Piège le focus à l'intérieur d'un élément (utile pour les dialogs).
 * Empêche Tab de sortir de l'élément.
 * 
 * @param elementRef - Ref de l'élément qui doit piéger le focus
 * @param isActive - État qui détermine si le trap doit être actif
 * 
 * @example
 * ```tsx
 * function Modal({ isOpen }) {
 *   const modalRef = useRef<HTMLDivElement>(null);
 *   useFocusTrap(modalRef, isOpen);
 *   return <div ref={modalRef}>...</div>;
 * }
 * ```
 */

export function useFocusTrap<T extends HTMLElement>(
  elementRef: RefObject<T>,
  isActive: boolean,
): void {
  useEffect(() => {
    if (!isActive) return;

    const element = elementRef.current;
    if (!element) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusableElements = element.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])',
      );

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      // Shift + Tab sur le premier élément -> focus le dernier
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
      // Tab sur le dernier élément -> focus le premier
      else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    element.addEventListener("keydown", handleKeyDown);
    return () => element.removeEventListener("keydown", handleKeyDown);
  }, [isActive, elementRef]);
}