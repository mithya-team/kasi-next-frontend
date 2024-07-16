import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface MatchedIconProps extends SvgIconProps {}

const MatchedIcon: FC<MatchedIconProps> = (props) => {
  const { className, width, height } = props;

  return (
    <svg
      width={width ?? '16'}
      height={height ?? '16'}
      className={className}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.99967 14.6663H9.99967C13.333 14.6663 14.6663 13.333 14.6663 9.99967V5.99967C14.6663 2.66634 13.333 1.33301 9.99967 1.33301H5.99967C2.66634 1.33301 1.33301 2.66634 1.33301 5.99967V9.99967C1.33301 13.333 2.66634 14.6663 5.99967 14.6663Z'
        stroke='#91E0C8'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.16699 7.99995L7.05366 9.88661L10.8337 6.11328'
        stroke='#91E0C8'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default MatchedIcon;
