import * as React from 'react';

import { getTextButtonStyles } from '@/lib/styles/ButtonStyles.helper';
import { cn } from '@/lib/utils';

import { TextButtonVariant } from '@/@types/ButtonsStyles';

export type TextButtonProps = {
  variant?: TextButtonVariant;
} & React.ComponentPropsWithRef<'button'>;

const TextButton = React.forwardRef<HTMLButtonElement, TextButtonProps>(
  (
    {
      children,
      className,
      variant = 'primary',
      disabled: buttonDisabled,
      ...rest
    },
    ref
  ) => {
    const { baseClasses, variantClasses } = getTextButtonStyles(variant);
    const ButtonClasses = cn(baseClasses, variantClasses, className);
    return (
      <button
        ref={ref}
        type='button'
        disabled={buttonDisabled}
        className={ButtonClasses}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default TextButton;
