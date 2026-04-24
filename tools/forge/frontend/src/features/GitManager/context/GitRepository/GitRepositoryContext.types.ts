import type { Branch, CommitNode, GitBranchTree, GitStatus } from "../../types";

export type GitRepositoryContextType = {
  gitData: GitStatus | null;
  gitTree: GitBranchTree | null;

  localEnabled: boolean;
  remoteEnabled: boolean;
  statusEnabled: boolean;

  setLocalEnabled: (enabled: boolean) => void;
  setRemoteEnabled: (enabled: boolean) => void;
  setStatusEnabled: (enabled: boolean) => void;

  triggerStatusRefresh: () => Promise<void>;

  isRefreshingStatus: boolean;

  localRemaining: number | null;
  remoteRemaining: number | null;
  statusRemaining: number | null;

  handleStatus: () => Promise<void>;
  handleLocalTree: () => Promise<void>;
  handleRemoteTree: () => Promise<void>;

  mergedBranches: Branch[];

  currentBranch: string;
  currentBranchCommits: CommitNode[];

  hasModifications: boolean;
};
