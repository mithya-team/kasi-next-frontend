import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface CallIconProps extends SvgIconProps {}

const ActiveSubscription: FC<CallIconProps> = () => {
  return (
    <svg
      width='50'
      height='50'
      viewBox='0 0 50 50'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <rect width='50' height='50' rx='14' fill='white' fillOpacity='0.2' />
      <path
        d='M18 33H32M15 17L18 29H32L35 17L29 24L25 17L21 24L15 17Z'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ActiveSubscription;
