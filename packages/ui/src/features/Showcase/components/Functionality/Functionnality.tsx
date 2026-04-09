import { Box } from "@workspace/ui/components";
import styles from "./Functionnality.module.css";
import { FaCheck } from "react-icons/fa"; // tu peux changer l'icône

interface FunctionnalityProps {
  functionnality?: string[];
}

export const Functionnality = ({ functionnality }: FunctionnalityProps) => {
  if (!functionnality || functionnality.length === 0) return null;

  return (
    <Box className={styles.container}>
      {functionnality.map((f, index) => (
        <div key={index} className={styles.badge}>
          <FaCheck className={styles.icon} />
          <span>{f}</span>
        </div>
      ))}
    </Box>
  );
};