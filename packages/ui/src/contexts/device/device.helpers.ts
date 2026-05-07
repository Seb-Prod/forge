import { useDevice } from "./DeviceContext";

/**
 * Indique si le device courant est un mobile.
 */
export const useIsMobile = (): boolean => {
  const { device, isReady } = useDevice();
  return isReady && device === "mobile";
};

/**
 * Indique si l'application est sur tablette.
 */
export const useIsTablet = (): boolean => {
  const { device, isReady } = useDevice();
  return isReady && device === "tablet";
};

/**
 * 
 * Indique si l'application est sur desktop
 */
export const useIsDesktop = (): boolean => {
  const { device, isReady } = useDevice();
  return isReady && device === "desktop";
};

/**
 * Indique si l’application est une PWA mobile.
 */
export const useIsPwaMobile = (): boolean => {
  const { pwaMode, isReady } = useDevice();
  return isReady && pwaMode === "pwaMobile";
};

/**
 * Indique l'écran et en portrait.
 */
export const useIsPortrait = (): boolean => {
  const {orientation, isReady} = useDevice();
  return isReady && orientation === "portrait";
}

export const useTheme = () => {
  const { theme, toggleTheme, isReady } = useDevice();
  return { theme, toggleTheme, isReady };
};

export const useIsDark = (): boolean => {
  const { theme, isReady } = useDevice();
  return isReady && theme === "dark";
};
