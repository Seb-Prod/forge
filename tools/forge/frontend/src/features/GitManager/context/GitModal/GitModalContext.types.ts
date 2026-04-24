export type FormResult = {
  branch: string;
  messages: string[];
  result: boolean;
};

export type SelectedFiles = {
  modified: string[];
  deleted: string[];
  untracked: string[];
};

// --- Payloads ---

type DiscardChangesModal = {
  modal: "discard";
  branchName: string;
  file: string;
};

type DeleteModalPayload = {
  modal: "delete";
  branchName: string;
};

type CreateBranchModalPayload = {
  modal: "create-branch";
  branchName: string;
  parent?: string;
};

type CheckoutModalPayload = {
  modal: "checkout";
  branchName: string;
};

type CommitModalPayload = {
  modal: "commit";
  branchName: string;
  selectedFiles: SelectedFiles;
};

type RenameModalPayload = {
  modal: "rename";
  branchName: string;
};

type FormModalPayload = {
  modal: "form";
  selectedPaths?: string[];
};

export type GitModalPayload =
  | DeleteModalPayload
  | CreateBranchModalPayload
  | CheckoutModalPayload
  | CommitModalPayload
  | RenameModalPayload
  | FormModalPayload
  | DiscardChangesModal;

// --- Modal ---

export type ActiveModal = GitModalPayload["modal"] | "result" | null;

// --- Context ---

export type GitModalContextType = {
  activeModal: ActiveModal;
  payload: GitModalPayload | null;

  openModal: (modal: ActiveModal, payload?: GitModalPayload) => void;
  closeModal: () => void;

  setPayload: (payload: GitModalPayload | null) => void;

  result: FormResult | null;
  setResult: (result: FormResult | null) => void;

  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};
