import { useMemo, type ReactNode } from "react";
import { useGitActions } from "../hooks/useGitActions";
import { useGitRefresh } from "../hooks/useGitRefresh";
import { GitContext } from "./GitContext";

export const GitProvider = ({ children }: { children: ReactNode }) => {
  const { gitData, gitTree, handleStatus, handleLocalTree, handleRemoteTree } =
    useGitActions();

  const {
    localEnabled,
    setLocalEnabled,
    remoteEnabled,
    setRemoteEnabled,
    statusEnabled,
    setStatusEnabled,
  } = useGitRefresh({
    handleLocalTree,
    handleRemoteTree,
    handleStatus,
  });

  /** True si le repo contient des fichiers modifiés ou supprimés */
  const hasModifications = useMemo(() => {
    if (!gitData) return false;
    return Boolean(
      (gitData.modified?.length ?? 0) > 0 || (gitData.deleted?.length ?? 0) > 0,
    );
  }, [gitData]);

  /** Branches enrichies avec les infos local/remote */
  const mergedBranches = useMemo(() => {
    if (!gitTree) return [];
    return gitTree.branchTree.map((branch) => {
      const info = gitTree.branches.find((b) => b.name === branch.name);
      return {
        ...branch,
        local: info?.local ?? false,
        remote: info?.remote ?? false,
      };
    });
  }, [gitTree]);

  return (
    <GitContext.Provider
      value={useMemo(
        () => ({
          gitData,
          gitTree,
          localEnabled,
          setLocalEnabled,
          remoteEnabled,
          setRemoteEnabled,
          statusEnabled,
          setStatusEnabled,
          handleStatus,
          handleLocalTree,
          handleRemoteTree,
          hasModifications,
          mergedBranches,
          currentBranch: gitTree?.currentBranch ?? "",
          currentBranchCommits: gitTree?.currentBranchCommits ?? [],
        }),
        [
          gitData,
          gitTree,
          localEnabled,
          setLocalEnabled,
          remoteEnabled,
          setRemoteEnabled,
          statusEnabled,
          setStatusEnabled,
          hasModifications,
          mergedBranches,
          handleStatus,
          handleLocalTree,
          handleRemoteTree,
        ],
      )}
    >
      {children}
    </GitContext.Provider>
  );
};
