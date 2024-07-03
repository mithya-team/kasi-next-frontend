import * as React from 'react';

import { getButtonStyles } from '@/lib/styles/ButtonStyles.helper';
import { cn } from '@/lib/utils';

import Icon, { IconType } from '@/components/icons/Icon';

import { ButtonSize, ButtonVariant } from '@/@types/ButtonsStyles';

export type ButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: IconType;
  rightIcon?: IconType;
  classNames?: {
    leftIcon?: string;
    rightIcon?: string;
  };
} & React.ComponentPropsWithRef<'button'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      size = 'base',
      isDarkBg = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      classNames,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    const { baseClasses, sizeClasses, variantClasses } = getButtonStyles(
      variant,
      size,
      isDarkBg
    );

    const ButtonClasses = cn(
      baseClasses,
      sizeClasses,
      variantClasses,
      disabled && 'disabled:cursor-not-allowed',
      isLoading &&
        'relative text-transparent transition-none hover:text-transparent disabled:cursor-wait',
      className
    );

    return (
      <button
        ref={ref}
        type='button'
        disabled={disabled}
        className={ButtonClasses}
        {...rest}
      >
        {isLoading && (
          <div
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
              {
                'text-white': ['primary', 'dark'].includes(variant),
                'text-black': ['light'].includes(variant),
                'text-primary-500': ['outline', 'ghost'].includes(variant),
              }
            )}
          >
            <Icon name='spinner' classNames={{ element: 'animate-spin' }} />
          </div>
        )}
        {LeftIcon && (
          <div
            className={cn([
              size === 'base' && 'mr-1',
              size === 'sm' && 'mr-1.5',
            ])}
          >
            <LeftIcon
              size='1em'
              className={cn(
                [
                  size === 'base' && 'md:text-md text-md',
                  size === 'sm' && 'md:text-md text-sm',
                ],
                classNames?.leftIcon
              )}
            />
          </div>
        )}
        {children}
        {RightIcon && (
          <div
            className={cn([
              size === 'base' && 'ml-1',
              size === 'sm' && 'ml-1.5',
            ])}
          >
            <RightIcon
              size='1em'
              className={cn(
                [
                  size === 'base' && 'text-md md:text-md',
                  size === 'sm' && 'md:text-md text-sm',
                ],
                classNames?.rightIcon
              )}
            />
          </div>
        )}
      </button>
    );
  }
);

export default Button;
