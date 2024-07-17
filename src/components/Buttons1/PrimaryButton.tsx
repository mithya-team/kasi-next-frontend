import React, { FC } from 'react';

import { cn } from '@/lib/utils';

import Button, { ButtonProps } from '@/components/Buttons1';
import Typo from '@/components/typography/Typo';

const PrimaryButton: FC<ButtonProps> = ({
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <Button
      {...props}
      disabled={disabled}
      className={cn(
        'tracking-[-0.75] w-full h-12 border-0 rounded-[10px] bg-gradient-to-r from-linear-1 to-linear-2 py-2.5 px-5',
        {
          ['opacity-40']: disabled,
        },
        className,
      )}
    >
      <Typo level='h4' classes='font-secondary font-semibold'>
        {children}
      </Typo>
    </Button>
  );
};

export default PrimaryButton;
