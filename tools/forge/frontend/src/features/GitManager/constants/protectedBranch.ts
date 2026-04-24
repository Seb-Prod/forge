export const PROTECTED_BRANCHES = ["main", "develop"];

export const isProtectedBranch = (branchName: string) =>
  PROTECTED_BRANCHES.includes(branchName);