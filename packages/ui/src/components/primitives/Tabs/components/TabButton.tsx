import { useSurfaceColors } from "@workspace/ui/helpers";
import { useBoxContext } from "../../Box";
import styles from "./TabButton.module.css";
import { Tone } from "@workspace/ui/constants";

type TabButtonProps = {
  label: string;
  active: boolean;
  tone?:Tone;
  onClick: () => void;
};

export const TabButton = ({ label, active, tone, onClick }: TabButtonProps) => {
  const box = useBoxContext();
  const surfaceColors = useSurfaceColors();

  const background = surfaceColors.getSurfaceBackground(
    active ? "raised" : "inverted",
    tone ? tone : box?.tone
  );

  const textColor = surfaceColors.getSurfaceTextColor(
    active ? "raised" : "inverted",
    tone ? tone : box?.tone
  );


  return (
    <button
      onClick={onClick}
      className={styles.button}
      data-active={active}
      style={
        {
          "--tab-bg": background,
          "--tab-color": textColor,
        } as React.CSSProperties
      }
    >
      {label}
    </button>
  );
};
