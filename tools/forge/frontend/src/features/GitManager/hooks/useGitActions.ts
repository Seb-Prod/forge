import { useState, useCallback, useRef } from "react";
import { runAction } from "@/services/api";
import type { GitStatus } from "../GitManager.types";
import type {
  GitBranchTreeLocal,
  GitBranchTreeRemote,
  GitBranchTree,
} from "../types/types";

export const LOCAL_REFRESH_INTERVAL = 30;
export const REMOTE_REFRESH_INTERVAL = 180;
export const STATUS_REFRESH_INTERVAL = 30;

export const useGitActions = () => {
  const [gitData, setGitData] = useState<GitStatus | null>(null);
  const [gitTree, setGitTree] = useState<GitBranchTree | null>(null);

  const isCheckingLocalRef = useRef(false);
  const isCheckingRemoteRef = useRef(false);
  const isCheckingStatusRef = useRef(false);

  const handleStatus = useCallback(async () => {
    if (isCheckingStatusRef.current) return;
    isCheckingStatusRef.current = true;
    try {
      const result = await runAction<GitStatus>("git-status", ["--silent"]);
      setGitData(result);
    } finally {
      isCheckingStatusRef.current = false;
    }
  }, []);

  const handleLocalTree = useCallback(async () => {
    if (isCheckingLocalRef.current) return;
    isCheckingLocalRef.current = true;
    try {
      const result = await runAction<GitBranchTreeLocal>(
        "git-branch-tree-local",
        [""],
      );
      setGitTree((prev) => {
        const next = { ...(prev ?? {}), ...result };
        return JSON.stringify(prev) === JSON.stringify(next) ? prev : next;
      });
    } finally {
      isCheckingLocalRef.current = false;
    }
  }, []);

  const handleRemoteTree = useCallback(async () => {
    if (isCheckingRemoteRef.current) return;
    isCheckingRemoteRef.current = true;
    try {
      const result = await runAction<GitBranchTreeRemote>(
        "git-branch-tree-remote",
        [""],
      );
      setGitTree((prev) => {
        if (!prev) return null;
        const nextBranches = result.branches;
        if (JSON.stringify(prev.branches) === JSON.stringify(nextBranches))
          return prev;
        return { ...prev, branches: nextBranches };
      });
    } finally {
      isCheckingRemoteRef.current = false;
    }
  }, []);

  return {
    gitData,
    setGitData,
    gitTree,
    setGitTree,
    handleStatus,
    handleLocalTree,
    handleRemoteTree,
  };
};
