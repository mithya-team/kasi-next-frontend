'use client';

import { FC } from 'react';

import PrimaryButton from '@/components/Buttons/PrimaryButton';
import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

interface SuccessProps {
  onContinue: () => void;
}

const Success: FC<SuccessProps> = ({ onContinue }) => {
  return (
    <div className='mx-auto flex flex-col w-[25rem] items-center gap-9 py-10'>
      <SvgIcon name='payment-success' />
      <div className='flex flex-col justify-center items-center gap-5'>
        <Typo
          level='h2'
          classes='font-secondary font-semibold text-white text-center tracking-[-0.225px]'
        >
          Subscription Confirmed!
        </Typo>
        <Typo classes='font-primary text-gray-500 text-center'>
          You're all set! Your subscription has been successfully activated.
          Enjoy our services!{' '}
        </Typo>
      </div>

      <PrimaryButton onClick={onContinue}>Continue</PrimaryButton>
    </div>
  );
};
export default Success;
