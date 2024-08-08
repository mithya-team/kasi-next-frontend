import { useRouter } from 'next/navigation';
import React, { FC } from 'react';

import { cn } from '@/lib/utils';

import PrimaryButton from '@/components/Buttons/PrimaryButton';
import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { ROUTE } from '@/constant/route';
import { ActiveProduct } from '@/models/admin/admin.types';

interface PlanStatusProps {
  activeProduct?: ActiveProduct;
}
const PlanStatus: FC<PlanStatusProps> = ({ activeProduct }) => {
  const router = useRouter();

  const onClick = () => router.push(ROUTE.SUBSCRIPTION_ROUTE.path);

  return (
    <div
      onClick={onClick}
      className='cursor-pointer flex flex-col gap-5 p-5 w-full bg-gray-800 rounded-[14px] relative'
    >
      <div className='bg-violet-1 w-24 h-14 absolute left-0 top-0 opacity-30 blur-[45px]' />
      <div className='bg-green-500 w-24 h-14 absolute right-0 bottom-0 opacity-30 blur-[45px]' />
      <div className='flex flex-row gap-5'>
        <SvgIcon
          name={
            activeProduct?.subscription?.status === 'active'
              ? 'active-subscription'
              : 'expired'
          }
        />
        <div className='flex flex-col w-[12.25rem]'>
          <Typo
            level='h4'
            classes='font-secondary font-semibold text-gray-50 tracking-[-0.01px]'
          >
            {activeProduct?.subscription?.status === 'active' ||
            activeProduct?.subscription?.status === 'delete_after_expiration'
              ? activeProduct?.name
              : ' Free trial expired'}
          </Typo>
          <Typo
            classes={cn(
              'font-primary text-sm font-medium text-green-500 capitalize',
              {
                ['text-gray-500']:
                  activeProduct?.subscription?.status !== 'active',
              },
            )}
          >
            {getSubtext(activeProduct)}
          </Typo>
        </div>
      </div>
      {activeProduct?.subscription?.status === 'active' ? null : (
        <PrimaryButton onClick={onClick}>Upgrade Plan</PrimaryButton>
      )}
    </div>
  );
};

export default PlanStatus;

const getSubtext = (activeProduct?: ActiveProduct) => {
  if (activeProduct?.subscription?.status === 'active') {
    return 'active';
  }
  return 'Please renew to continue enjoying our services.';
};
