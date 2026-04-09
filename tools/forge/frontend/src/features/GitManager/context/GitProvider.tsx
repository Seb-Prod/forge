import { useMemo, type ReactNode } from "react";
import { useGitActions } from "../hooks/useGitActions";
import { useGitRefresh } from "../hooks/useGitRefresh";
import { GitContext } from "./GitContext";
// import { useGitCountdown } from "../hooks/useGitCountdown";

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

  // const { localRemaining, remoteRemaining, statusRemaining } = useGitCountdown({
  //   local: localEnabled,
  //   remote: remoteEnabled,
  //   status: statusEnabled,
  // });

  /**
   * Calcule si le repo a des modifications (modifié ou supprimé)
   * @type {boolean}
   */
  const hasModifications = useMemo(() => {
    if (!gitData) return false;

    return Boolean(
      (gitData.modified?.length ?? 0) > 0 || (gitData.deleted?.length ?? 0) > 0,
    );
  }, [gitData]);

  return (
    <GitContext.Provider
      value={{
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
        // localRemaining,
        // remoteRemaining,
        // statusRemaining,
        hasModifications,
      }}
    >
      {children}
    </GitContext.Provider>
  );
};
