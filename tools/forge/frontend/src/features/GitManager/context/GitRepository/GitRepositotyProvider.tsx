import { useMemo, useEffect, type ReactNode } from "react";
import { GitRepositoryContext } from "./GitRepositoryContext";
import { useGitRepositoryData, useGitRefresh } from "../../hooks";

export const GitRepositoryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const {
    gitData,
    gitTree,
    handleStatus,
    handleLocalTree,
    handleRemoteTree,
    lastLocalRun,
    lastRemoteRun,
    lastStatusRun,
  } = useGitRepositoryData();

  // 🔥 refresh auto (stable)
  useGitRefresh({
    handleLocalTree,
    handleRemoteTree,
    handleStatus,
  });

  // ─────────────────────────────
  // ✅ DEBUG PROPRE (pas à chaque render)
  // ─────────────────────────────
  useEffect(() => {
    console.log("✅ gitData REALLY changed", gitData);
  }, [gitData]);

  useEffect(() => {
    console.log("🌳 gitTree REALLY changed", gitTree);
  }, [gitTree]);

  useEffect(() => {
    console.log("🚀 PROVIDER MOUNT");
  }, []);

  // ─────────────────────────────
  // ✅ DERIVED STATE SIMPLE
  // ─────────────────────────────
  const hasModifications =
    (gitData?.modified?.length ?? 0) > 0 || (gitData?.deleted?.length ?? 0) > 0;

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

  // ─────────────────────────────
  // ✅ CONTEXT VALUE STABLE
  // ─────────────────────────────
  const value = useMemo(
    () => ({
      gitData,
      gitTree,

      handleStatus,
      handleLocalTree,
      handleRemoteTree,

      lastLocalRun,
      lastRemoteRun,
      lastStatusRun,

      hasModifications,
      mergedBranches,

      currentBranch: gitTree?.currentBranch ?? "",
      currentBranchCommits: gitTree?.currentBranchCommits ?? [],
    }),
    [
      gitData,
      gitTree,
      handleStatus,
      handleLocalTree,
      handleRemoteTree,
      lastLocalRun,
      lastRemoteRun,
      lastStatusRun,
      hasModifications,
      mergedBranches,
    ],
  );

  console.log("🔁 PROVIDER RENDER");

  return (
    <GitRepositoryContext.Provider value={value}>
      {children}
    </GitRepositoryContext.Provider>
  );
};
