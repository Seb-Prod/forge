import type { Branch, CommitNode, GitBranchTree, GitStatus } from "../../types";

export type GitRepositoryContextType = {
  gitData: GitStatus | null;
  gitTree: GitBranchTree | null;

  handleStatus: () => Promise<void>;
  handleLocalTree: () => Promise<void>;
  handleRemoteTree: () => Promise<void>;

  lastLocalRun: number;
  lastRemoteRun: number;
  lastStatusRun: number;

  hasModifications: boolean;
  mergedBranches: Branch[];

  currentBranch: string;
  currentBranchCommits: CommitNode[];
};
