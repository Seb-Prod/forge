import {
  Button,
  Modal,
  ModalClose,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@workspace/ui";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  confirmLabel: string;
  cancelLabel?: string;
  hideCancel?: boolean;
  tone?: "neutral" | "danger" | "success";
  loading?: boolean;
  closeOnOutsideClick?: boolean;
  onConfirm: () => void;
}

export const ConfirmDialog = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  cancelLabel = "Annuler",
  hideCancel = false,
  tone = "neutral",
  loading = false,
  closeOnOutsideClick = true,
  onConfirm,
}: ConfirmDialogProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange} closeOnOutsideClick={closeOnOutsideClick}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>

        <ModalFooter>
          {!hideCancel && (
            <ModalClose>
              <Button tone="neutral" appearance="ghost" disabled={loading}>
                {cancelLabel}
              </Button>
            </ModalClose>
          )}

          <Button tone={tone} onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
