import { createContext, useContext } from "react";
import { CardTone } from "../Card.types";

interface CardContextType {
    tone?: CardTone;
}

const CardContext = createContext<CardContextType | null>(null);

export const CardProvider = CardContext.Provider;

export function useCardContext() {
  const ctx = useContext(CardContext);
  if (!ctx) {
    throw new Error("Doit être utilisé à l'intérieur d'une Card");
  }
  return ctx;
}
