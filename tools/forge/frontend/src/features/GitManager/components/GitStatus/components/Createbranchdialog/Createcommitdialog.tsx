import { useState } from "react";
import { Checkbox, FormDialog } from "@workspace/ui";
import {
  BranchNamingFields,
  branchNamingPresets,
} from "../../../BranchNamingFields";
import { FileStatusList } from "./FileStatusList";

const DEFAULT_TYPE = "feature";
const DEFAULT_SCOPE = "appFrontend";

/** Fichiers sélectionnés regroupés par statut. */
type SelectedFiles = {
  modified: string[];
  deleted: string[];
  untracked: string[];
};

/**
 * Props du composant `CreateCommitDialog`.
 */
interface CreateCommitDialogProps {
  /** Contrôle l'ouverture de la dialog. */
  open: boolean;

  /** Callback déclenché lors d'un changement d'état d'ouverture. */
  onOpenChange: (open: boolean) => void;

  /**
   * Callback déclenché à la soumission du formulaire.
   * @param commitMessage - Message de commit final construit par le preset.
   */
  onSubmit: (commitMessage: string) => Promise<void>;

  /** Indique si une opération de création est en cours. */
  isLoading: boolean;

  /** Fichiers sélectionnés regroupés par statut. */
  selectedFiles: SelectedFiles;
}

/**
 * Dialog de création d'un commit Git.
 *
 * Gère l'état local du formulaire (type, scope, description) et délègue
 * le rendu des champs à `BranchNamingFields`. Le message de commit final
 * est dérivé directement depuis le preset sans état intermédiaire.
 *
 * @example
 * ```tsx
 * <CreateCommitDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   onSubmit={async (message) => await createCommit(message)}
 *   isLoading={isPending}
 * />
 * ```
 */
export const CreateCommitDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
  selectedFiles,
}: CreateCommitDialogProps) => {
  const [type, setType] = useState(DEFAULT_TYPE);
  const [scope, setScope] = useState(DEFAULT_SCOPE);
  const [description, setDescription] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  const hasDelete = selectedFiles.deleted.length > 0;

  /** Message de commit final dérivé directement depuis le preset, sans état intermédiaire. */
  const commitMessage = branchNamingPresets.commit.buildOutput({
    type,
    scope,
    description: branchNamingPresets.commit.formatDescription(description),
  });

  /** Remet le formulaire dans son état initial. */
  const resetForm = () => {
    setDescription("");
    setType(DEFAULT_TYPE);
    setScope(DEFAULT_SCOPE);
  };

  const handleSubmit = async () => {
    if (!description.trim()) return;
    await onSubmit(commitMessage);
    resetForm();
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) resetForm();
    onOpenChange(nextOpen);
  };

  return (
    <FormDialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Créer un commit"
      onSubmit={handleSubmit}
      submitLabel={isLoading ? "Création..." : "Créer"}
      submitDisabled={isLoading || !description.trim() || (hasDelete && !confirmDelete)}
    >
      {/* Liste des fichiers sélectionnés */}
      <FileStatusList
        label="Modifiés"
        paths={selectedFiles.modified}
        tone="warning"
      />
      <FileStatusList
        label="Supprimés"
        paths={selectedFiles.deleted}
        tone={"danger"}
      />
      <FileStatusList
        label="Nouveaux"
        paths={selectedFiles.untracked}
        tone={"success"}
      />
      <BranchNamingFields
        type={type}
        scope={scope}
        description={description}
        isLoading={isLoading}
        onTypeChange={setType}
        onScopeChange={setScope}
        onDescriptionChange={setDescription}
        preset={branchNamingPresets.commit}
      />
      {hasDelete && (
        <Checkbox
          label="Je confirme la suppression des fichiers"
          checked={confirmDelete}
          onChange={(e) => setConfirmDelete(e.target.checked)}
        />
      )}
    </FormDialog>
  );
};
