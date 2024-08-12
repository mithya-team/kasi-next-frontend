import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface PaceIconProps extends SvgIconProps {}

const PaceIcon: FC<PaceIconProps> = (props) => {
  const { className, width, height, strokeColor } = props;

  return (
    <svg
      width={width ?? '16'}
      height={height ?? '20'}
      className={className}
      viewBox='0 0 16 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 15L6 16L6.75 14.5M12 19V15L8 12L9 6M9 2C9 2.26522 9.10536 2.51957 9.29289 2.70711C9.48043 2.89464 9.73478 3 10 3C10.2652 3 10.5196 2.89464 10.7071 2.70711C10.8946 2.51957 11 2.26522 11 2C11 1.73478 10.8946 1.48043 10.7071 1.29289C10.5196 1.10536 10.2652 1 10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289C9.10536 1.48043 9 1.73478 9 2Z'
        stroke={strokeColor ?? '#91E0C8'}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4 10V7L9 6L12 9L15 10'
        stroke={strokeColor ?? '#91E0C8'}
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default PaceIcon;
