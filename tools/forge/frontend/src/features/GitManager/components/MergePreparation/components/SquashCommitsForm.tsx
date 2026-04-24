import { useEffect, useState } from "react";
import { FormDialog } from "@workspace/ui";
import { BranchNamingFields, branchNamingPresets } from "../../GitModals/components/BranchNamingFields";


const DEFAULT_TYPE = "feature";
const DEFAULT_SCOPE = "appFrontend";
const STORAGE_KEY = "git.commit.preferences";

/**
 * Get initial type & scope from localStorage
 */
const getInitialValues = () => {
  if (typeof window === "undefined") {
    return { type: DEFAULT_TYPE, scope: DEFAULT_SCOPE };
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored
      ? JSON.parse(stored)
      : { type: DEFAULT_TYPE, scope: DEFAULT_SCOPE };
  } catch {
    return { type: DEFAULT_TYPE, scope: DEFAULT_SCOPE };
  }
};

/**
 * Squash commit form dialog
 */
export const SquashCommitsForm = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (commitMessage: string) => Promise<void>;
  isLoading: boolean;
}) => {
  // ---------- State ----------
  const { type: initialType, scope: initialScope } = getInitialValues();

  const [type, setType] = useState(initialType);
  const [scope, setScope] = useState(initialScope);
  const [description, setDescription] = useState("");

  // ---------- Effects ----------
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ type, scope }));
  }, [type, scope]);

  // ---------- Derived ----------
  const commitMessage = branchNamingPresets.commit.buildOutput({
    type,
    scope,
    description: branchNamingPresets.commit.formatDescription(description),
  });

  // ---------- Handlers ----------
  const handleSubmit = async () => {
    if (!description.trim()) return;
    await onSubmit(commitMessage);
    // setDescription("");
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) setDescription("");
    onOpenChange(nextOpen);
  };

  // ---------- Render ----------
  return (
    <FormDialog
      open={open}
      onOpenChange={handleOpenChange}
      title="Créer un commit unique (Squash)"
      onSubmit={handleSubmit}
      submitLabel={isLoading ? "Création..." : "Créer"}
    >
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
    </FormDialog>
  );
};