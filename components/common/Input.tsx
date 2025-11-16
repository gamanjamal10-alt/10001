import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  id: string;
  type: 'text' | 'number' | 'tel' | 'textarea' | 'email' | 'password';
  rows?: number;
}

export const Input: React.FC<InputProps> = ({ label, id, type, rows, className, ...props }) => {
  const baseClasses = "block w-full px-4 py-2.5 mt-2 text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-md focus:border-primary-400 focus:ring-primary-300 focus:ring-opacity-40 dark:focus:border-primary-300 focus:outline-none focus:ring transition-colors duration-200";
  
  const InputComponent = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div>
      <label htmlFor={id} className="text-gray-700 dark:text-gray-200 font-medium">
        {label}
        {props.required && <span className="text-red-500 mr-1">*</span>}
      </label>
      <InputComponent
        id={id}
        type={type === 'textarea' ? undefined : type}
        rows={type === 'textarea' ? rows : undefined}
        className={`${baseClasses} ${className || ''}`}
        {...(props as any)}
      />
    </div>
  );
};
