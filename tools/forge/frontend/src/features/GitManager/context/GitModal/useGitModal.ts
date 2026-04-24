import { useContext } from "react";
import { GitModalContext } from "./GitModalContext";

export const useGitModal = () => {
  const context = useContext(GitModalContext);

  if (!context) {
    throw new Error("UseGitModal must be used within a GitModalProvider");
  }

  return context;
};
