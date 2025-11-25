import type { ReactNode } from "react";
import { createPortal } from "react-dom";

import { useModal } from "@/hooks/useModal";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
};

export default function Modal({ children, isOpen, onClose, title }: ModalProps) {
  const modalRef = useModal(isOpen, onClose);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-10 flex animate-slideDown items-center justify-center bg-black/50 duration-75"
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={modalRef}
        className="relative max-h-[50vh] w-1/2 overflow-y-auto rounded-3xl border border-border bg-card p-2 text-card-foreground md:p-10"
      >
        {title !== undefined && title.length > 0 && <h2 className="mb-4 text-xl font-bold text-card-foreground">{title}</h2>}
        {children}
      </div>
    </div>,
    document.body,
  );
}
