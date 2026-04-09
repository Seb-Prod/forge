// GitContext.types.ts
import type { GitStatus } from "../GitManager.types";
import type { GitBranchTree } from "../types/types";

export type GitContextType = {
  gitData: GitStatus | null;
  gitTree: GitBranchTree | null;

  // localRemaining: number;
  // remoteRemaining: number;
  // statusRemaining: number;

  localEnabled:     boolean;
  remoteEnabled:    boolean;
  statusEnabled:    boolean;
  setLocalEnabled:  (enabled: boolean) => void;
  setRemoteEnabled: (enabled: boolean) => void;
  setStatusEnabled: (enabled: boolean) => void;

  handleStatus: () => Promise<void>;
  handleLocalTree: () => Promise<void>;
  handleRemoteTree: () => Promise<void>;

  hasModifications: boolean;
};