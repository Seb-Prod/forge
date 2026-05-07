import {
  DeviceType,
  Orientation,
  OS,
  Breakpoint,
  PwaMode,
  Theme,
} from "./device.types";
import { BREAKPOINTS } from "./device.constants";

/**
 * Détermine le type de device à partir de la largeur de l’écran.
 */
export const getDeviceType = (width: number): DeviceType => {
  if (width < BREAKPOINTS.md) return "mobile";
  if (width < BREAKPOINTS.lg) return "tablet";
  return "desktop";
};

/**
 * Détermine le breakpoint courant à partir de la largeur.
 */
export const getBreakpoint = (width: number): Breakpoint => {
  if (width < BREAKPOINTS.sm) return "sm";
  if (width < BREAKPOINTS.md) return "md";
  if (width < BREAKPOINTS.lg) return "lg";
  return "xl";
};

/**
 * Détermine l'orientation de l'écran.
 * Utilise l'API native Screen Orientation quand disponible.
 */
export const getOrientation = (): Orientation => {
  if (window.matchMedia) {
    return window.matchMedia("(orientation: portrait)").matches 
      ? 'portrait' 
      : 'landscape';
  }
  
  if (window.screen?.orientation) {
    return window.screen.orientation.type.includes('portrait') 
      ? 'portrait' 
      : 'landscape';
  }
  return window.innerHeight >= window.innerWidth ? 'portrait' : 'landscape';
};

/**
 * Détecte le système d’exploitation à partir du user agent.
 */
export const getOS = (): OS => {
  const ua = navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(ua)) return "ios";
  if (/android/.test(ua)) return "android";
  if (/windows/.test(ua)) return "windows";
  if (/macintosh/.test(ua)) return "macos";
  if (/linux/.test(ua)) return "linux";

  return "unknown";
};

/**
 * Détecte si l’appareil supporte les interactions tactiles.
 */
export const getIsTouch = (): boolean =>
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

/**
 * Indique si l’application est exécutée en mode PWA.
 */
export const isPWA = (): boolean =>
  window.matchMedia("(display-mode: standalone)").matches ||
  // Spécifique iOS
  (navigator as any).standalone === true;

/**
 * Détermine le mode PWA selon le type de device.
 */
export const getPwaMode = (device: DeviceType): PwaMode => {
  if (!isPWA()) return false;

  switch (device) {
    case "mobile":
      return "pwaMobile";
    case "tablet":
      return "pwaTablet";
    default:
      return "pwaDesktop";
  }
};

/**
 * Retourne la préférence système (prefers-color-scheme).
 */
export const getSystemTheme = (): Theme => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

/**
 * Résout le thème initial :
 * 1. Valeur persistée en localStorage
 * 2. Préférence système
 * 3. Fallback "light"
 */
export const getInitialTheme = (): Theme => {
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return getSystemTheme();
};