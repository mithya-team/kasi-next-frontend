import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface SubscriptionIconProps extends SvgIconProps {}

const SubscriptionIcon: FC<SubscriptionIconProps> = (props) => {
  const { className, width, height, pathFill } = props;

  return (
    <svg
      width={width ?? '20'}
      height={height ?? '18'}
      className={className}
      viewBox='0 0 20 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 5.70588H12.25M4.6 13.2353H6.4M8.65 13.2353H12.25M19 10.9106V12.8682C19 16.1718 18.199 17 15.004 17H4.996C1.801 17 1 16.1718 1 12.8682V5.13176C1 1.82824 1.801 1 4.996 1H12.25M17.2 6.64706V1M17.2 1L19 2.88235M17.2 1L15.4 2.88235'
        stroke={pathFill ?? 'white'}
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default SubscriptionIcon;
