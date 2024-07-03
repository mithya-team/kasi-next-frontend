import * as React from 'react';
import { useRef, useState } from 'react';

import { cn } from '@/lib/utils';

interface DialogProps {
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  classes?: {
    modal: string;
  };
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  hasCloseBtn = true,
  onClose,
  children,
  classes,
}) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  React.useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  React.useEffect(() => {
    const modalElement = modalRef.current;

    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <dialog
      ref={modalRef}
      onKeyDown={handleKeyDown}
      className={cn('modal', classes?.modal)}
    >
      {hasCloseBtn && (
        <button className='modal-close-btn' onClick={handleCloseModal}>
          Close
        </button>
      )}
      {children}
    </dialog>
  );
};

export default Dialog;
