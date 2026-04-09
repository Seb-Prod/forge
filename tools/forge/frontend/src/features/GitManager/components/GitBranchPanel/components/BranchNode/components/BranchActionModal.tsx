import { ConfirmDialog } from "@workspace/ui";

interface BranchActionModalProps {
  type: "delete" | "checkout" | null;
  branchName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export const BranchActionModal = ({
  type,
  branchName,
  open,
  onOpenChange,
  onConfirm,
}: BranchActionModalProps) => {
  if (!type) return null;

  const config = {
    delete: {
      title: "Supprimer la branche",
      description: `Êtes-vous sûr de vouloir supprimer "${branchName}" ?`,
      confirmLabel: "Supprimer",
      tone: "danger" as const,
    },
    checkout: {
      title: "Changer de branche",
      description: `Passer sur "${branchName}" ?`,
      confirmLabel: "Changer",
      tone: "success" as const,
    },
  }[type];

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={config.title}
      description={config.description}
      confirmLabel={config.confirmLabel}
      tone={config.tone}
      onConfirm={onConfirm}
    />
  );
};