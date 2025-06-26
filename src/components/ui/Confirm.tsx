import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import type { ConfirmProps } from '../../types';

export const Confirm: React.FC<ConfirmProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'default'
}) => {
  const variantClasses = {
    warning: {
      titleColor: 'text-yellow-600 dark:text-yellow-400',
      confirmVariant: 'yellow' as const,
      cancelVariant: 'gray' as const
    },
    danger: {
      titleColor: 'text-red-600 dark:text-red-400',
      confirmVariant: 'red' as const,
      cancelVariant: 'gray' as const
    },
    default: {
      titleColor: 'text-blue-600 dark:text-blue-400',
      confirmVariant: 'blue' as const,
      cancelVariant: 'gray' as const
    }
  }

  const { titleColor, confirmVariant, cancelVariant } = variantClasses[type as keyof typeof variantClasses];

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      footer={
        <div className="p-6">
          <div className="flex gap-3 justify-end">
            <Button
              onClick={onClose}
              variant={cancelVariant}
              aria-label={cancelText}
            >
              {cancelText}
            </Button>
            <Button
              onClick={handleConfirm}
              variant={confirmVariant}
              aria-label={confirmText}
            >
              {confirmText}
            </Button>
          </div>
        </div>
      }
    >
      <p className={`${titleColor} text-center text-lg`}>
        {message}
      </p>
    </Modal>
  );
}; 