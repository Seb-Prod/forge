import {
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "@workspace/ui";

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
  submitLabel?: string;
  submitDisabled?:boolean;
  cancelLabel?: string;
}

export const FormDialog = ({
  open,
  onOpenChange,
  title,
  children,
  onSubmit,
  submitLabel = "Valider",
  cancelLabel = "Annuler",
  submitDisabled
}: FormDialogProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange} closeOnOutsideClick={false}>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{title}</ModalTitle>
        </ModalHeader>

        <div className="py-4">{children}</div>

        <ModalFooter>
          <Button
            appearance="ghost"
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </Button>

          <Button onClick={onSubmit} disabled={submitDisabled}>{submitLabel}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};