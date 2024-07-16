import React, { FC } from 'react';

import { cn } from '@/lib/utils';

import ErrorMessage from '@/components/ErrorMessage';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  className?: string;
  labelClassName?: string;
  helperTextClassName?: string;
  checkboxClassName?: string;
  error?: string;
}

const CheckboxInput: FC<CheckboxProps> = ({
  label,
  helperText,
  className,
  labelClassName,
  helperTextClassName,
  checkboxClassName,
  error,
  ...props
}) => {
  return (
    <div className={cn('flex items-start flex-col', className)}>
      <label className={cn('flex', labelClassName)}>
        <input
          type='checkbox'
          className={cn(
            'form-checkbox cursor-pointer h-5 w-5 transition duration-150 ease-in-out',
            checkboxClassName,
          )}
          {...props}
        />
        <div className='text-sm ml-2 flex flex-col text-left'>
          {label && (
            <span className={cn('text-sm cursor-pointer', labelClassName)}>
              {label}
            </span>
          )}
          {helperText && (
            <span
              className={cn(
                'text-xs text-gray-500 mt-1 block',
                helperTextClassName,
              )}
            >
              {helperText}
            </span>
          )}
        </div>
      </label>
      {error && <ErrorMessage error={error} />}
    </div>
  );
};

export default CheckboxInput;
