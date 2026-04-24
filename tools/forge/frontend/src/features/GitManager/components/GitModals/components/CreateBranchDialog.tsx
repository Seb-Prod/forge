import { FormDialog } from "@workspace/ui";
import { BranchNamingFields, branchNamingPresets } from "./BranchNamingFields";
import { useNamingForm } from "../hooks/useNamingForm";

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
   * @param value - Nom de branche généré.
   */
  onSubmit: (value: string) => Promise<void>;

  /** Indique si une opération est en cours. */
  isLoading: boolean;
}

/**
 * Dialog de création de branche Git.
 * Génère un nom formaté à partir des champs type, scope et description.
 */
export const CreateBranchDialog = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: CreateBranchDialogProps) => {
  const {
    type,
    scope,
    description,
    setType,
    setScope,
    setDescription,
    value,
    reset,
  } = useNamingForm(branchNamingPresets.branch);

  const handleSubmit = async () => {
    if (!description.trim()) return;
    await onSubmit(value);
    reset();
  };

  return (
    <FormDialog
      open={open}
      onOpenChange={(o) => {
        if (!o) reset();
        onOpenChange(o);
      }}
      title="Créer une branche"
      onSubmit={handleSubmit}
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