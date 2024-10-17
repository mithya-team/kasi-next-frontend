import { FC } from 'react';

import { cn } from '@/lib/utils';
import useAsyncTask from '@/hooks/useAsyncTask';

import Button from '@/components/Buttons';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Typo from '@/components/typography/Typo';

import {
  ActiveProduct,
  SubscriptionProductsDetails,
} from '@/models/admin/admin.types';
import { ProductPlanId } from '@/models/user/user.types';

export interface SubscriptionCardProps {
  className?: string;
  isActive?: boolean;
  product: ActiveProduct | SubscriptionProductsDetails;
  onClick: (product: ActiveProduct | SubscriptionProductsDetails) => void;
}
const SubscriptionCard: FC<SubscriptionCardProps> = ({
  className,
  isActive,
  product,
  onClick,
}) => {
  const onClickTask = useAsyncTask(onClick);
  return (
    <div
      className={cn(
        'rounded-[15px] bg-gray-800 flex flex-col gap-3 p-5 w-[26.25rem]',
        className,
      )}
    >
      <div className='flex flex-col'>
        <div className='flex flex-row justify-between items-center'>
          <Typo classes='text-white font-secondary font-semibold text-lg leading-[22px] tracking-[-0.09px]'>
            {product?.name}
          </Typo>
          {isActive ? (
            <Button className='px-5 py-1.5 bg-green-900 text-white font-primary text-sm rounded-[10px]'>
              Active
            </Button>
          ) : null}
        </div>
        <div className='bg-gray-1 h-[1px] opacity-20 mt-3' />
      </div>
      <div className='flex flex-row gap-1 items-baseline'>
        <Typo
          level='h4'
          classes='font-secondary text-white text-xl font-semibold tracking-[-0.1px]'
        >{`$${product?.amountString}`}</Typo>
        <Typo classes='text-gray-500 font-medium font-primary text-xs leading-5'>
          {getSubscriptionPeriod(product?.planId)}
        </Typo>
      </div>
      {product?.planId !== 'FREE_TIER' ? (
        isActive ? (
          <Button
            onClick={() => onClick(product)}
            className='px-5 py-2.5 border border-green-500 rounded-[10px] bg-black-1 font-secondary text-white font-semibold text-xl tracking-[-0.1px]'
          >
            {isActiveProduct(product) &&
            product.subscription?.status === 'delete_after_expiration'
              ? 'Renew plan'
              : 'Cancel plan'}
          </Button>
        ) : (
          <PrimaryButton
            isLoading={onClickTask.isLoading}
            onClick={() => onClickTask.run(product)}
          >
            Subscribe now
          </PrimaryButton>
        )
      ) : (
        <></>
      )}
    </div>
  );
};
export default SubscriptionCard;

const getSubscriptionPeriod = (name: ProductPlanId) => {
  switch (name) {
    case 'FREE_TIER':
      return '';
    case 'PAID_TIER_1_MONTH':
      return '/ month';
    case 'PAID_TIER_6_MONTHS':
      return '/ month billable half-yearly';
    case 'PAID_TIER_12_MONTHS':
      return '/month billable yearly';
    default:
      return '';
  }
};

function isActiveProduct(
  product: ActiveProduct | SubscriptionProductsDetails,
): product is ActiveProduct {
  return (product as ActiveProduct).subscription !== undefined;
}
