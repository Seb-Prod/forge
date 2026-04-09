import { ReactNode } from "react";
import styles from "./DeviceInfo.module.css";

/**
 * Propriétés du composant DeviceInfoItem.
 */
export interface DeviceInfoItemProps {
  /** Libellé de l'information */
  label: string;
  
  /** Valeur à afficher */
  value: string | boolean | null;
  
  /** Icône à afficher */
  icon: ReactNode;
}

/**
 * Composant DeviceInfoItem - Affiche une ligne d'information
 * avec icône, label et valeur.
 * 
 * @example
 * ```tsx
 * <DeviceInfoItem 
 *   label="Appareil" 
 *   value="mobile" 
 *   icon={<HiDevicePhoneMobile />}
 * />
 * ```
 */
export function DeviceInfoItem({ label, value, icon }: DeviceInfoItemProps) {
  return (
    <div className={styles.infoItem}>
      <div className={styles.iconWrapper}>
        {icon}
      </div>
      <div className={styles.content}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{String(value)}</span>
      </div>
    </div>
  );
}