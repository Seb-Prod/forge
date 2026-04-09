import { createContext } from "react";
import type { ModalContextType } from "./ModalContext.type";

export const ModalContext = createContext<ModalContextType | null>(null);