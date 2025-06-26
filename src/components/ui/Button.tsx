import React from 'react';
import type { ButtonProps } from "../../types/components/Button.types";


export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'outline',
  disabled = false,
  className = '',
  size = 'md'
}) => {
  const baseClasses = 'w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  };
  
  const variantClasses = {
    outline: 'bg-transparent dark:text-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:hover:bg-gray-600 border-2 border-gray-300 dark:border-gray-600',
    gray: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
    yellow: 'bg-yellow-500 text-black hover:bg-yellow-600 focus:ring-yellow-500',
    blue: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    red: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    green: 'bg-green-500 text-white hover:bg-green-600 focus:ring-green-500',
    transparent: 'bg-transparent text-gray-800 hover:bg-gray-300 focus:ring-gray-500 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant as keyof typeof variantClasses]} ${className}`}
      aria-label={children?.toString()}
    >
      {children}
    </button>
  );
}; 