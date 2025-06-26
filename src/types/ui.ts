export interface UIButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'gray' | 'yellow' | 'blue' | 'red' | 'green' | 'transparent';
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface UIModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
} 