import * as React from 'react';

import { getButtonStyles } from '@/lib/styles/ButtonStyles.helper';
import { cn } from '@/lib/utils';

import Icon, { IconType } from '@/components/icons/Icon';

import { ButtonVariant } from '@/@types/ButtonsStyles';

export type IconButtonProps = {
  isLoading?: boolean;
  isDarkBg?: boolean;
  variant?: ButtonVariant;
  icon?: IconType;
  classNames?: {
    icon?: string;
  };
} & React.ComponentPropsWithRef<'button'>;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      disabled: buttonDisabled,
      isLoading,
      variant = 'primary',
      isDarkBg = false,
      icon: IconPassed,
      classNames,
      ...rest
    },
    ref
  ) => {
    const disabled = isLoading || buttonDisabled;

    const { baseClasses, variantClasses } = getButtonStyles(
      variant,
      'base',
      isDarkBg
    );

    const IconButtonClasses = cn(
      baseClasses,
      'min-h-[28px] min-w-[28px] p-1 md:min-h-[34px] md:min-w-[34px] md:p-2',
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
        className={IconButtonClasses}
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
            <Icon
              name='spinner'
              size={60}
              classNames={{ element: 'animate-spin' }}
            />
          </div>
        )}
        {IconPassed && (
          <IconPassed size='1em' className={cn(classNames?.icon)} />
        )}
      </button>
    );
  }
);

export default IconButton;
