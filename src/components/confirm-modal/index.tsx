import Button from "@/components/button";
import Modal from "@/components/modal";

type ConfirmModalProps = {
  isOpen: boolean;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
};

export default function ConfirmModal({ isOpen, message, onCancel, onConfirm, title }: ConfirmModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title}>
      <div className="space-y-4">
        <p className="text-card-foreground">{message}</p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm} type="button">
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
