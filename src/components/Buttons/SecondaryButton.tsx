import { FC } from 'react';

import { cn } from '@/lib/utils';

import Button, { ButtonProps } from '@/components/Buttons';
import Typo from '@/components/typography/Typo';

export interface SecondaryButtonProps extends ButtonProps {
  titleClass?: string;
}
const SecondaryButton: FC<SecondaryButtonProps> = ({
  children,
  titleClass,
  ...props
}) => {
  return (
    <Button {...props}>
      <Typo
        level='h4'
        classes={cn(
          'font-secondary font-semibold tracking-2 text-white',
          titleClass,
        )}
      >
        {children}
      </Typo>
    </Button>
  );
};

export default SecondaryButton;
