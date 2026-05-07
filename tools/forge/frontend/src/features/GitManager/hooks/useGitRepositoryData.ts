import { useState, useCallback, useRef } from "react";
import { runAction } from "@/services/api";
import type {
  GitBranchTreeLocal,
  GitBranchTreeRemote,
  GitBranchTree,
  GitStatus,
} from "../types/types";

export const LOCAL_REFRESH_INTERVAL = 30;
export const REMOTE_REFRESH_INTERVAL = 180;
export const STATUS_REFRESH_INTERVAL = 30;

export const useGitRepositoryData = () => {
  const [gitData, setGitData] = useState<GitStatus | null>(null);
  const [gitTree, setGitTree] = useState<GitBranchTree | null>(null);

  const [lastLocalRun, setLastLocalRun] = useState(Date.now());
  const [lastRemoteRun, setLastRemoteRun] = useState(Date.now());
  const [lastStatusRun, setLastStatusRun] = useState(Date.now());

  // guards anti double call
  const isFetching = useRef({
    local: false,
    remote: false,
    status: false,
  });

  const handleStatus = useCallback(async () => {
    if (isFetching.current.status) return;
    isFetching.current.status = true;

    try {
      const result = await runAction<GitStatus>("git-status", ["--silent"]);
      setGitData(result);
      setLastStatusRun(Date.now());
    } finally {
      isFetching.current.status = false;
    }
  }, []);

  const handleLocalTree = useCallback(async () => {
    if (isFetching.current.local) return;
    isFetching.current.local = true;

    try {
      const result = await runAction<GitBranchTreeLocal>(
        "git-branch-tree-local",
        ["--silent"],
      );

      setGitTree(result as GitBranchTree);
      setLastLocalRun(Date.now());
    } finally {
      isFetching.current.local = false;
    }
  }, []);

  const handleRemoteTree = useCallback(async () => {
    if (isFetching.current.remote) return;
    isFetching.current.remote = true;

    try {
      const result = await runAction<GitBranchTreeRemote>(
        "git-branch-tree-remote",
        ["--silent"],
      );

      setGitTree((prev) => {
        if (!prev) return prev;
        return { ...prev, branches: result.branches };
      });
      setLastRemoteRun(Date.now());
    } finally {
      isFetching.current.remote = false;
    }
  }, []);

  return {
    gitData,
    gitTree,
    handleStatus,
    handleLocalTree,
    handleRemoteTree,
    lastLocalRun,
    lastRemoteRun,
    lastStatusRun,
  };
};
