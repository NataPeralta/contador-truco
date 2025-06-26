import { useState, useCallback } from 'react';

interface AlertState {
  isOpen: boolean;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  onClose?: () => void;
}

interface ConfirmState {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

interface ShowConfirmParams {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export const useAlerts = () => {
  const [alert, setAlert] = useState<AlertState>({
    isOpen: false,
    title: '',
    message: '',
    type: 'success'
  });

  const [confirm, setConfirm] = useState<ConfirmState>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => { },
    onCancel: () => { }
  });

  // Función para cerrar alertas
  const closeAlert = useCallback(() => {
    setAlert(prev => ({ ...prev!, isOpen: false }));
  }, []);

  // Función para cerrar confirmaciones
  const closeConfirm = useCallback(() => {
    setConfirm(prev => ({ ...prev!, isOpen: false }));
  }, []);

  // Función para mostrar alertas
  const showAlert = useCallback((
    title: string,
    message: string,
    type: 'success' | 'warning' | 'error' | 'info' = 'success',
    onClose?: () => void
  ) => {
    setAlert({
      isOpen: true,
      title,
      message,
      type,
      onClose: () => {
        onClose?.();
        closeAlert();
      }
    });
  }, [closeAlert]);

  // Función para mostrar confirmaciones con objeto desestructurado
  const showConfirm = useCallback(({ title, message, onConfirm, onCancel }: ShowConfirmParams) => {
    setConfirm({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        closeConfirm();
      },
      onCancel: () => {
        onCancel?.();
        closeConfirm();
      }
    });
  }, [closeConfirm]);

  return {
    alert,
    confirm,
    showAlert,
    showConfirm,
    closeAlert,
    closeConfirm
  };
}; 