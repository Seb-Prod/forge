import { RefObject, useEffect } from "react";

/**
 * Détecte les clics en dehors d'un élément.
 * 
 * @param elementRef - Ref de l'élément à surveiller
 * @param handler - Callback appelé lors d'un clic extérieur
 * @param isEnabled - Active/désactive la détection
 * 
 * @example
 * ```tsx
 * function Dropdown({ isOpen, onClose }) {
 *   const dropdownRef = useRef<HTMLDivElement>(null);
 *   useOnClickOutside(dropdownRef, onClose, isOpen);
 *   return <div ref={dropdownRef}>...</div>;
 * }
 * ```
 */

export function useOnClickOutside<T extends HTMLElement>(
  elementRef: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
  isEnabled: boolean = true,
): void {
  useEffect(() => {
    if (!isEnabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const element = elementRef.current;
      
      // Ne rien faire si l'élément n'existe pas ou si le clic est à l'intérieur
      if (!element || element.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [elementRef, handler, isEnabled]);
}