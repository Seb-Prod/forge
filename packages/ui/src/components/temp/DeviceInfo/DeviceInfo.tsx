import { CardHold } from "../Card";
import {
  HiDevicePhoneMobile,
  HiDeviceTablet,
  HiComputerDesktop,
  HiArrowsUpDown,
  HiCpuChip,
  HiHandRaised,
  HiRocketLaunch,
  HiSparkles,
} from "react-icons/hi2";
import { MdOutlinePhoneIphone } from "react-icons/md";
import styles from "./DeviceInfo.module.css";
import { DeviceInfoItem } from "./DeviceInfoItem";
import { useDevice } from "../../../contexts";

/**
 * Informations détectées sur l'appareil.
 */
export interface DeviceData {
  /** Type d'appareil */
  device: string;

  /** Point de rupture responsive actuel */
  breakpoint: string;

  /** Orientation de l'écran */
  orientation: string;

  /** Système d'exploitation */
  os: string;

  /** Support tactile */
  isTouch: boolean;

  /** Mode PWA actif */
  pwaMode?: string | null;
}

/**
 * Propriétés du composant DeviceInfo.
 */
export interface DeviceInfoProps {
  /** Titre de la carte */
  title?: string;

  /** Variante visuelle de la carte */
  variant?: "base" | "elevated" | "outlined";

  /** Taille de la carte */
  size?: "sm" | "md" | "lg";

  /** Afficher le badge d'en-tête */
  showHeaderBadge?: boolean;

  /** Afficher le footer */
  showFooter?: boolean;

  /** Texte du footer personnalisé */
  footerText?: string;

  /** Classes CSS supplémentaires */
  className?: string;
}

/**
 * Composant DeviceInfo - Affiche les informations détectées sur l'appareil
 * dans une carte formatée avec icônes.
 *
 * @example
 * ```tsx
 * const deviceData = {
 *   device: "mobile",
 *   breakpoint: "sm",
 *   orientation: "portrait",
 *   os: "iOS",
 *   isTouch: true,
 *   pwaMode: "standalone"
 * };
 *
 * <DeviceInfo deviceData={deviceData} variant="elevated" />
 * ```
 */
export const DeviceInfo = ({
  title = "Informations de l'appareil",
  variant = "elevated",
  size = "lg",
  showHeaderBadge = true,
  showFooter = true,
  footerText = "Les informations sont mises à jour automatiquement",
  className = "",
}: DeviceInfoProps) => {
  const { device, breakpoint, orientation, os, isTouch, pwaMode } = useDevice();

  const getDeviceIcon = () => {
    switch (device) {
      case "mobile":
        return <HiDevicePhoneMobile />;
      case "tablet":
        return <HiDeviceTablet />;
      case "desktop":
        return <HiComputerDesktop />;
      default:
        return <HiCpuChip />;
    }
  };

  return (
    <CardHold
      title={title}
      variant={variant}
      tone="info"
      size={size}
      as="article"
      className={className}
      headerAction={
        showHeaderBadge ? (
          <div className={styles.headerBadge}>
            <HiSparkles />
            <span>Détection en temps réel</span>
          </div>
        ) : undefined
      }
      footer={
        showFooter ? (
          <div className={styles.footer}>
            <span className={styles.footerText}>{footerText}</span>
          </div>
        ) : undefined
      }
    >
      <div className={styles.infoGrid}>
        <DeviceInfoItem
          label="Appareil"
          value={device}
          icon={getDeviceIcon()}
        />
        <DeviceInfoItem
          label="Point de rupture"
          value={breakpoint}
          icon={<HiArrowsUpDown />}
        />
        <DeviceInfoItem
          label="Orientation"
          value={orientation}
          icon={
            <MdOutlinePhoneIphone
              className={
                orientation !== "portrait"
                  ? styles.orientationLandscape
                  : undefined
              }
            />
          }
        />
        <DeviceInfoItem
          label="Système d'exploitation"
          value={os}
          icon={<HiCpuChip />}
        />
        <DeviceInfoItem
          label="Mode PWA"
          value={pwaMode || "Non"}
          icon={<HiRocketLaunch />}
        />
        <DeviceInfoItem
          label="Écran tactile"
          value={isTouch ? "Oui" : "Non"}
          icon={<HiHandRaised />}
        />
      </div>
    </CardHold>
  );
};
