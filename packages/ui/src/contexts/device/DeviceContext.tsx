import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from "react";

import { DeviceState, DeviceContextValue } from "./device.types";
import { RESIZE_DEBOUNCE_DELAY } from "./device.constants";
import {
  getBreakpoint,
  getDeviceType,
  getInitialTheme,
  getIsTouch,
  getOrientation,
  getOS,
  getPwaMode,
} from "./device.detectors";

const DeviceContext = createContext<DeviceContextValue | undefined>(undefined);

interface DeviceProviderProps {
  children: ReactNode;
}

export const DeviceProvider = ({ children }: DeviceProviderProps) => {
  const [state, setState] = useState<DeviceState>({
    device: "desktop",
    breakpoint: "xl",
    orientation: "landscape",
    os: "unknown",
    isTouch: false,
    pwaMode: false,
    theme: "light",
  });

  const [isReady, setIsReady] = useState(false);
  const resizeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const toggleTheme = useCallback(() => {
    setState((prev) => {
      const next = prev.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      document.documentElement.setAttribute("data-theme", next);
      return { ...prev, theme: next };
    });
  }, []);

  useEffect(() => {
    const detectEnvironment = () => {
      const width = window.innerWidth;
      const device = getDeviceType(width);

      setState((prev) => ({
        ...prev,
        device,
        breakpoint: getBreakpoint(width),
        orientation: getOrientation(),
        os: getOS(),
        isTouch: getIsTouch(),
        pwaMode: getPwaMode(device),
      }));
    };

    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        window.clearTimeout(resizeTimeoutRef.current);
      }
      resizeTimeoutRef.current = window.setTimeout(
        detectEnvironment,
        RESIZE_DEBOUNCE_DELAY,
      );
    };

    /**
     * Synchronise le thème si la préférence système change
     * en cours de session. Ignoré si un choix manuel existe.
     */
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return;
      const next = e.matches ? "dark" : "light";
      setState((prev) => ({ ...prev, theme: next }));
      document.documentElement.setAttribute("data-theme", next);
    };

    const initialTheme = getInitialTheme();
    document.documentElement.setAttribute("data-theme", initialTheme);

    detectEnvironment();
    setState((prev) => ({ ...prev, theme: initialTheme }));
    setIsReady(true);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleSystemThemeChange);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
      if (resizeTimeoutRef.current) {
        window.clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <DeviceContext.Provider value={{ ...state, isReady, toggleTheme }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = (): DeviceContextValue => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within DeviceProvider");
  }
  return context;
};