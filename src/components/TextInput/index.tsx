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
    <div className={cn(className, 'cmp-TextInput', 'flex flex-col')}>
      {label ? (
        <label
          className={cn(
            'cmp-TextInput__label font-sans mb-2',
            classNames?.label,
          )}
        >
          {label}
        </label>
      ) : null}
      <div
        className={cn(
          'flex items-center font-sans border p-2 rounded',
          classNames?.inputRoot,
          {
            'border-red-3': !!error,
          },
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
            'w-full leading-normal font-sans font-light auto text-2xl bg-transparent',
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
        <span
          className={cn(
            'cmp-TextInput__helper-text text-xs text-gray-4 mt-1',
            classNames?.helperText,
          )}
        >
          {helperText}
        </span>
      ) : null}
      {!!error && typeof error === 'string' ? (
        <ErrorMessage error={error} />
      ) : null}
    </div>
  );
};

export default TextInput;
