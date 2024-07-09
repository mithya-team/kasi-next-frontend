import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface ClockIconProps extends SvgIconProps {}

const ClockIcon: FC<ClockIconProps> = (props) => {
  const { className, width, height, strokeColor, strokeWidth } = props;

  return (
    <svg
      width={width ?? '19'}
      height={height ?? '21'}
      viewBox='0 0 19 21'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M9.3125 6.7V11.45M6.4625 1H12.1625M17.625 11.6875C17.625 16.276 13.901 20 9.3125 20C4.724 20 1 16.276 1 11.6875C1 7.099 4.724 3.375 9.3125 3.375C13.901 3.375 17.625 7.099 17.625 11.6875Z'
        stroke={strokeColor ?? 'white'}
        strokeWidth={strokeWidth ?? '1.6'}
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ClockIcon;
