import { FC } from 'react';

import SecondaryButton from '@/components/Buttons/SecondaryButton';
import Typo from '@/components/typography/Typo';

interface AuthFormFooterProps {
  onClick?: () => void;
  primaryText: string;
  helperText?: string;
}

const AuthFormFooter: FC<AuthFormFooterProps> = ({
  onClick,
  primaryText,
  helperText = '',
}) => {
  return (
    <div className='flex flex-row justify-center items-baseline'>
      <Typo classes='font-primary font-medium leading-[14px] mr-1 text-sm text-gray-400'>
        {helperText}
      </Typo>
      <SecondaryButton onClick={onClick}>{primaryText}</SecondaryButton>
    </div>
  );
};

export default AuthFormFooter;
