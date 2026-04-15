export type Branch = {
  name: string;
  parent: string | null;
};

export type CommitNode = {
  id: string;
  message: string;
  parents: string[];
  refs: string[];
};

export type GitEdge = {
  from: string;
  to: string;
};


export type GitBranchTreeLocal = {
  currentBranch: string;
  branchTree: Branch[];
  branches: { name: string; local: boolean; remote: boolean }[];
  nodes: CommitNode[];
  edges: GitEdge[];
  currentBranchCommits : CommitNode[];
};

export type GitBranchTreeRemote = {
  branches: { name: string; local: boolean; remote: boolean }[];
};

export type GitBranchTree = GitBranchTreeLocal & Partial<GitBranchTreeRemote>;