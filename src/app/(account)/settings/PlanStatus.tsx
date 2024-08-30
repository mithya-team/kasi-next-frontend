import dayjs from 'dayjs';
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
        <div className='flex flex-col'>
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
            level='h4'
            classes='font-secondary font-semibold text-gradient-1 tracking-[-0.01px]'
          >
            {activeProduct?.subscription?.status === 'active' ||
            activeProduct?.subscription?.status === 'delete_after_expiration'
              ? getPlanStatusText(activeProduct)
              : null}
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

const getPlanStatusText = (activeProduct: ActiveProduct) => {
  if (!activeProduct?.subscription) return '';

  const { creditDurationInDays, creditDurationInMonths } = activeProduct;
  const currentPeriodStart = dayjs(
    activeProduct?.subscription.currentPeriodStart,
  );

  let endDate = currentPeriodStart;
  if (creditDurationInDays) {
    endDate = currentPeriodStart.add(creditDurationInDays, 'day');
  } else if (creditDurationInMonths) {
    endDate = currentPeriodStart.add(creditDurationInMonths, 'month');
  }

  const today = dayjs();
  const formattedEndDate = endDate.format('MMM DD');

  if (endDate.isBefore(today)) {
    return `Ended on ${formattedEndDate}`;
  } else {
    return `Ends on ${formattedEndDate}`;
  }
};
