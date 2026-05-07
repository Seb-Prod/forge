import { Surface, Tone } from "@workspace/ui/constants";
import { createContext, useContext } from "react";

type BoxContextType = {
  surface?: Surface;
  tone?: Tone;
};

export const BoxContext = createContext<BoxContextType | null>(null);

export const useBoxContext = () => useContext(BoxContext);