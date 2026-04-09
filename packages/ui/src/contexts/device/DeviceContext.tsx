import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";

import { DeviceContextValue } from "./device.types";
import { RESIZE_DEBOUNCE_DELAY } from "./device.constants";
import {
  getBreakpoint,
  getDeviceType,
  getIsTouch,
  getOrientation,
  getOS,
  getPwaMode,
} from "./device.detectors";

/* -------------------------------------------------------------------------- */
/*                                  Context                                   */
/* -------------------------------------------------------------------------- */

const DeviceContext = createContext<DeviceContextValue | undefined>(undefined);

/* -------------------------------------------------------------------------- */
/*                                  Provider                                  */
/* -------------------------------------------------------------------------- */

interface DeviceProviderProps {
  /** Composants enfants */
  children: ReactNode;
}

/**
 * Fournit les informations liées au device, à l’environnement
 * et au mode d’exécution (PWA).
 */
export const DeviceProvider = ({ children }: DeviceProviderProps) => {
  const [state, setState] = useState<Omit<DeviceContextValue, "isReady">>({
    device: "desktop",
    breakpoint: "xl",
    orientation: "landscape",
    os: "unknown",
    isTouch: false,
    pwaMode: false,
  });

  const [isReady, setIsReady] = useState(false);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    /**
     * Détection complète de l’environnement.
     * (Exécutée uniquement côté client)
     */
    const detectEnvironment = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const device = getDeviceType(width);

      setState({
        device,
        breakpoint: getBreakpoint(width),
        orientation: getOrientation(),
        os: getOS(),
        isTouch: getIsTouch(),
        pwaMode: getPwaMode(device),
      });
    };

    /**
     * Gestion du resize avec debounce pour limiter
     * les re-renders inutiles.
     */
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        window.clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = window.setTimeout(
        detectEnvironment,
        RESIZE_DEBOUNCE_DELAY,
      );
    };

    detectEnvironment();
    setIsReady(true);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      
      if (resizeTimeoutRef.current) {
        window.clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <DeviceContext.Provider value={{ ...state, isReady }}>
      {children}
    </DeviceContext.Provider>
  );
};

/* -------------------------------------------------------------------------- */
/*                                    Hook                                    */
/* -------------------------------------------------------------------------- */

/**
 * Hook d’accès au DeviceContext.
 *
 * @throws Error si utilisé en dehors du DeviceProvider
 */
export const useDevice = (): DeviceContextValue => {
  const context = useContext(DeviceContext);

  if (!context) {
    throw new Error("useDevice must be used within DeviceProvider");
  }

  return context;
};
