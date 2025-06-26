import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import type { AlertProps } from "../../types/components/Alert.types";

export const Alert: React.FC<AlertProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = 'info'
}) => {
   const variantClasses = {
    success: {
          titleColor: 'text-green-600 dark:text-green-400',
          buttonVariant: 'green' as const
        },
    warning: {
          titleColor: 'text-yellow-600 dark:text-yellow-400',
          buttonVariant: 'yellow' as const
        },
    error: {
          titleColor: 'text-red-600 dark:text-red-400',
          buttonVariant: 'red' as const
        },
    info: {
          titleColor: 'text-blue-600 dark:text-blue-400',
          buttonVariant: 'blue' as const
        }
  };

  const { titleColor, buttonVariant } = variantClasses[type as keyof typeof variantClasses];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      footer={
        <div className="p-6">
          <div className="flex justify-end">
            <Button
              onClick={onClose}
              variant={buttonVariant}
              aria-label="Aceptar"
            >
              Aceptar
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