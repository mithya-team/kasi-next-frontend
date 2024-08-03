import React, { FC } from 'react';

import { cn } from '@/lib/utils';

import Button, { ButtonProps } from '@/components/Buttons';
import SvgIcon from '@/components/SvgIcon';
import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface StartCallButtonProps extends ButtonProps {
  svgProps?: SvgIconProps;
}
const EndCallButton: FC<StartCallButtonProps> = ({
  children,
  className,
  svgProps,
  ...props
}) => {
  return (
    <Button
      leftIcon={<SvgIcon name='end-call' {...svgProps} />}
      className={cn(
        'py-[7px] px-4 bg-red-300 justify-center items-center font-primary text-sm font-medium rounded-[10px] gap-[7px]',
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
};

export default EndCallButton;
