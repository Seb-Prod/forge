import { ConfirmDialog } from "@workspace/ui";
import { useGitModal } from "../../context";
import { useGitActions } from "../../hooks/useGitActions";
import { CreateBranchDialog } from "./components/CreateBranchDialog";
import { CommitDialog } from "./components/CommitDialog";

export const GitModals = () => {
  const { activeModal, closeModal, result, isLoading, payload } = useGitModal();

  const { deleteBranch, createBranch, commit } = useGitActions();

  const commitPayload =
    activeModal === "commit" && payload?.modal === "commit" ? payload : null;

  return (
    <>
      <CommitDialog
        selectedFiles={commitPayload?.selectedFiles}
        open={activeModal === "commit"}
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
        onSubmit={async (branchName) => {
          await commit(branchName);
        }}
        isLoading={isLoading}
      />

      <CreateBranchDialog
        open={activeModal === "create-branch"}
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
        onSubmit={async (branchName) => {
          await createBranch(branchName);
        }}
        isLoading={isLoading}
      />

      <ConfirmDialog
        tone="danger"
        open={activeModal === "delete"}
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
        closeOnOutsideClick={false}
        title={"Suppression"}
        description={`Supprimer la branche : ${payload?.branchName}`}
        confirmLabel={"ok"}
        onConfirm={deleteBranch}
        loading={isLoading}
      />

      {/* Boite de dialigue avec le resultat */}
      <ConfirmDialog
        open={activeModal === "result"}
        onOpenChange={(open) => {
          if (!open) closeModal();
        }}
        title={result?.result ? "Succès" : "Erreur"}
        description={result?.messages}
        onConfirm={closeModal}
        confirmLabel={"ok"}
        hideCancel
      />
    </>
  );
};
