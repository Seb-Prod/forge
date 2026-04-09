/**
 * Type de device basé sur la largeur de l’écran.
 */
export type DeviceType = "mobile" | "tablet" | "desktop";

/**
 * Orientation de l’écran.
 */
export type Orientation = "portrait" | "landscape";

/**
 * Système d’exploitation détecté à partir du user agent.
 */
export type OS =
  | "ios"
  | "android"
  | "windows"
  | "macos"
  | "linux"
  | "unknown";

/**
 * Breakpoints inspirés de Tailwind CSS.
 */
export type Breakpoint = "sm" | "md" | "lg" | "xl";

/**
 * Mode d’exécution PWA selon le type de device.
 *
 * - false : application web classique
 * - pwaMobile : PWA installée sur mobile
 * - pwaTablet : PWA installée sur tablette
 * - pwaDesktop : PWA installée sur desktop
 */
export type PwaMode =
  | false
  | "pwaMobile"
  | "pwaTablet"
  | "pwaDesktop";

/**
 * Valeur exposée par le DeviceContext.
 */
export interface DeviceContextValue {
  /** Type de device */
  device: DeviceType;

  /** Breakpoint courant */
  breakpoint: Breakpoint;

  /** Orientation de l’écran */
  orientation: Orientation;

  /** Système d’exploitation */
  os: OS;

  /** Indique si l’appareil supporte le tactile */
  isTouch: boolean;

  /** Mode PWA selon le device */
  pwaMode: PwaMode;

  /**
   * Indique si la détection du device est terminée.
   * Utile pour éviter les effets de layout au premier render.
   */
  isReady: boolean;
}