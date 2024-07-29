import { FC } from 'react';

import { cn } from '@/lib/utils';

import Button, { ButtonProps } from '@/components/Buttons';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Typo from '@/components/typography/Typo';

interface SubscriptionCardProps {
  className?: string;
  isActive?: boolean;
  label: string;
  plan: string;
  onClick: ButtonProps['onClick'];
}
const SubscriptionCard: FC<SubscriptionCardProps> = ({
  className,
  isActive,
  plan,
  label,
  onClick,
}) => {
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
            {label}
          </Typo>
          {isActive ? (
            <Button className='px-5 py-1.5 bg-green-900 text-white font-primary text-sm rounded-[10px]'>
              Active
            </Button>
          ) : null}
        </div>
        <div className='bg-gray-1 h-[1px] opacity-20 mt-3' />
      </div>
      <div className='flex flex-row items-baseline'>
        <Typo
          level='h4'
          classes='font-secondary text-white text-xl font-semibold tracking-[-0.1px]'
        >{`$${plan}/`}</Typo>
        <Typo classes='text-gray-500 font-medium font-primary text-xs leading-5'>
          per month
        </Typo>
      </div>
      {isActive ? (
        <Button
          onClick={onClick}
          className='px-5 py-2.5 border border-green-500 rounded-[10px] bg-black-1 font-secondary text-white font-semibold text-xl tracking-[-0.1px]'
        >
          Cancel plan
        </Button>
      ) : (
        <PrimaryButton onClick={onClick}>Subscribe now</PrimaryButton>
      )}
    </div>
  );
};
export default SubscriptionCard;
