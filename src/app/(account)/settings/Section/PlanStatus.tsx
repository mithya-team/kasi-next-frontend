import { useRouter } from 'next/navigation';
import React from 'react';

import PrimaryButton from '@/components/Buttons/PrimaryButton';
import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { ROUTE } from '@/constant/route';

function PlanStatus() {
  const router = useRouter();

  const onClick = () => router.push(ROUTE.SUBSCRIPTION_ROUTE.path);

  return (
    <div className='flex flex-col gap-5 p-5 w-full bg-gray-800 rounded-[14px] relative'>
      <div className='bg-violet-1 w-24 h-14 absolute left-0 top-0 opacity-30 blur-[45px]' />
      <div className='bg-green-500 w-24 h-14 absolute right-0 bottom-0 opacity-30 blur-[45px]' />
      <div className='flex flex-row gap-5'>
        <SvgIcon name='expired' />
        <div className='flex flex-col w-[12.25rem]'>
          <Typo
            level='h4'
            classes='font-secondary font-semibold text-gray-50 tracking-[-0.01px]'
          >
            Free trial expired
          </Typo>
          <Typo classes='font-primary text-sm font-medium text-gray-500'>
            Please renew to continue enjoying our services.
          </Typo>
        </div>
      </div>
      <PrimaryButton onClick={onClick}>Upgrade Plan</PrimaryButton>
    </div>
  );
}

export default PlanStatus;
