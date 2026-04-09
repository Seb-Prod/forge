import { useState } from "react";
import { FormDialog } from "@workspace/ui";
import {
  BranchNamingFields,
  branchNamingPresets,
} from "../../../BranchNamingFields";

const DEFAULT_TYPE = "feature";
const DEFAULT_SCOPE = "appFrontend";

/**
 * Props du composant `CreateBranchDialog`.
 */
interface CreateBranchDialogProps {
  /** Contrôle l'ouverture de la dialog. */
  open: boolean;

  /** Callback déclenché lors d'un changement d'état d'ouverture. */
  onOpenChange: (open: boolean) => void;

  /**
   * Callback déclenché à la soumission du formulaire.
   * @param branchName - Nom de branche final construit par le preset.
   */
  onSubmit: (branchName: string) => Promise<void>;

  /** Indique si une opération de création est en cours. */
  isLoading: boolean;
}

/**
 * Dialog de création d'une nouvelle branche Git.
 *
 * Gère l'état local du formulaire (type, scope, description) et délègue
 * le rendu des champs à `BranchNamingFields`. Le nom de branche final
 * est dérivé directement depuis le preset sans état intermédiaire.
 *
 * @example
 * ```tsx
 * <CreateBranchDialog
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   onSubmit={async (name) => await createBranch(name)}
 *   isLoading={isPending}
 * />
 * ```
 */
export const CreateBranchDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: CreateBranchDialogProps) => {
  const [type, setType] = useState(DEFAULT_TYPE);
  const [scope, setScope] = useState(DEFAULT_SCOPE);
  const [description, setDescription] = useState("");

  /** Nom de branche final dérivé directement depuis le preset. */
  const finalName = branchNamingPresets.branch.buildOutput({
    type,
    scope,
    description: branchNamingPresets.branch.formatDescription(description),
  });

  /** Remet le formulaire dans son état initial. */
  const resetForm = () => {
    setDescription("");
    setType(DEFAULT_TYPE);
    setScope(DEFAULT_SCOPE);
  };

  const handleSubmit = async () => {
    if (!description.trim()) return;
    await onSubmit(finalName);
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
      title="Créer une nouvelle branche"
      onSubmit={handleSubmit}
      submitLabel={isLoading ? "Création..." : "Créer"}
      submitDisabled={isLoading || !description.trim()}
    >
      <BranchNamingFields
        type={type}
        scope={scope}
        description={description}
        isLoading={isLoading}
        onTypeChange={setType}
        onScopeChange={setScope}
        onDescriptionChange={setDescription}
        preset={branchNamingPresets.branch}
      />
    </FormDialog>
  );
};