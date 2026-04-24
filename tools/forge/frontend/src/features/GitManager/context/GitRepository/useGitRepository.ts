import { useContext } from "react";
import { GitRepositoryContext } from "./GitRepositoryContext";

export const useGitRepository = () => {
  const context = useContext(GitRepositoryContext);

  if (!context) {
    throw new Error("useGitRepository must be used within a GitReoisitoryProvider");
  }

  return context;
};
