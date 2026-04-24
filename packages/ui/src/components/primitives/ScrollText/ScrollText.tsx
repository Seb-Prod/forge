import { useRef, useState } from "react";
import { Text } from "../Text/Text";
import type { TextProps } from "../Text/Text.types";
import styles from "./ScrollText.module.css";

type ScrollTextProps = Omit<TextProps, "truncate" | "lineClamp"> & {
  /** Vitesse de défilement en px/s.
   * @default 50
   */
  speed?: number;
};

/**
 * ScrollText
 *
 * Variante animée de `Text` pour les contenus susceptibles de déborder.
 *
 * - Hérite de tous les tokens typographiques de `Text`.
 * - Détecte au hover si le texte déborde de son conteneur.
 * - Déclenche un défilement horizontal uniquement si le texte déborde.
 * - Revient à l'état tronqué au départ du curseur.
 *
 * @example
 * <ScrollText size="sm" tone="warning" speed={40}>
 *   src/components/très/long/chemin/fichier.tsx
 * </ScrollText>
 */
export const ScrollText = ({ speed = 50, children, ...props }: ScrollTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [duration, setDuration] = useState(0);

  const handleMouseEnter = () => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const overflow = text.scrollWidth > container.clientWidth;
    if (!overflow) return;

    setDuration(text.scrollWidth / speed);
    setIsOverflowing(true);
  };

  const handleMouseLeave = () => setIsOverflowing(false);

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ overflow: "hidden", whiteSpace: "nowrap" }}
    >
      <Text
        ref={textRef}
        {...props}
        truncate={!isOverflowing}
        style={{
          display: "inline-block",
          animationName: isOverflowing ? styles["scroll-text"] : "none",
          animationDuration: `${duration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {children}
      </Text>
    </div>
  );
};