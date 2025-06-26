export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'outline' | 'gray' | 'yellow' | 'blue' | 'red' | 'green' | 'transparent';
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}