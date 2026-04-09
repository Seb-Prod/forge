import { useLayoutEffect, useState } from "react";

// ─────────────────────────────────────────────
// Constantes
// ─────────────────────────────────────────────

const OFFSET = 8;

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

export function useSelectPosition(
  open: boolean,
  triggerRef: React.RefObject<HTMLDivElement | null>,
  dropdownRef: React.RefObject<HTMLDivElement | null>,
  setOpen: (v: boolean) => void,
) {
  // --- État ---

  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const [side, setSide]         = useState<"top" | "bottom">("bottom");

  // --- Calcul de position ---

  function updatePosition() {
    if (!triggerRef.current || !dropdownRef.current) return;

    const rect           = triggerRef.current.getBoundingClientRect();
    const dropdownHeight = dropdownRef.current.offsetHeight;

    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      setOpen(false);
      return;
    }

    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp     = spaceBelow < dropdownHeight;

    setSide(openUp ? "top" : "bottom");

    setPosition({
      top: openUp
        ? rect.top  + window.scrollY - dropdownHeight - OFFSET
        : rect.bottom + window.scrollY + OFFSET,
      left:  rect.left + window.scrollX,
      width: rect.width,
    });
  }

  // --- Effets ---

  /** Recalcule la position au scroll et au resize */
  useLayoutEffect(() => {
    if (!open) return;

    requestAnimationFrame(updatePosition);

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  /** Recalcule la position si la taille du dropdown change */
  useLayoutEffect(() => {
    if (!open || !dropdownRef.current) return;

    const observer = new ResizeObserver(updatePosition);
    observer.observe(dropdownRef.current);

    return () => observer.disconnect();
  }, [open]);

  // --- Retour ---

  return { position, side };
}