
import React from 'react';
import { LoadingSpinner } from '../icons/LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ children, isLoading = false, fullWidth = false, ...props }) => {
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      className={`flex items-center justify-center px-8 py-3 text-lg font-semibold text-white transition-colors duration-300 transform bg-primary-600 rounded-lg hover:bg-primary-500 focus:outline-none focus:bg-primary-500 disabled:bg-primary-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed ${widthClass}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <LoadingSpinner className="mr-3" />}
      {children}
    </button>
  );
};
