import { FC } from 'react';

import './index.css';

import { cn } from '@/lib/utils';

import ErrorMessage from '../ErrorMessage';

export interface TextInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  label?: string;
  error?: string | boolean;
  helperText?: string;
  classNames?: {
    inputRoot?: string;
    label?: string;
    input?: string;
    startAdornment?: string;
    endAdornment?: string;
    helperText?: string;
    error?: string;
  };
}

const TextInput: FC<TextInputProps> = (props) => {
  const {
    className,
    startAdornment,
    endAdornment,
    label,
    disabled,
    error,
    helperText,
    classNames,
    type = 'text',
    ...inputProps
  } = props;

  return (
    <div
      className={cn(className, 'cmp-TextInput', 'flex flex-col font-primary ')}
    >
      {label ? (
        <label
          className={cn(
            'cmp-TextInput__label font-primary text-xs text-gray-500 mb-0',
            classNames?.label,
          )}
        >
          {label}
        </label>
      ) : null}
      <div
        className={cn(
          'flex items-center border-0 p-0 border-b border-b-gray-500 rounded-none',
          classNames?.inputRoot,
        )}
      >
        {startAdornment ? (
          <div
            className={cn(
              'cmp-TextInput__start-adornment px-1',
              classNames?.startAdornment,
            )}
          >
            {startAdornment}
          </div>
        ) : null}
        <input
          disabled={disabled}
          autoComplete='false'
          type={type}
          className={cn(
            'cmp-TextInput__input',
            'w-full leading-normal border-0  bg-transparent font-primary font-medium text-base text-white p-0',
            classNames?.input,
            {
              'bg-gray-1': disabled,
            },
          )}
          {...inputProps}
        />
        {endAdornment ? (
          <div
            className={cn(
              'cmp-TextInput__end-adornment flex justify-center items-center px-1',
              classNames?.endAdornment,
            )}
          >
            {endAdornment}
          </div>
        ) : null}
      </div>
      {helperText ? (
        <div
          className={cn(
            'cmp-TextInput__helper-text font-primary text-xs font-medium text-gray-500 mt-1',
            classNames?.helperText,
          )}
        >
          {helperText}
        </div>
      ) : null}
      {!!error && typeof error === 'string' ? (
        <ErrorMessage error={error} />
      ) : null}
    </div>
  );
};

export default TextInput;
