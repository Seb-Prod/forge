import { useContext } from "react";
import { GitContext } from "./GitContext";

export const useGit = () => {
  const context = useContext(GitContext);

  if (!context) {
    throw new Error("useGit must be used within a GitProvider");
  }

  return context;
};