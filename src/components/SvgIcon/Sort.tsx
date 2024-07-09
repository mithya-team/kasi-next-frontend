import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface SortIconProps extends SvgIconProps {}

const SortIcon: FC<SortIconProps> = (props) => {
  const { className, width, height } = props;

  return (
    <svg
      width={width ?? '32'}
      height={height ?? '32'}
      className={className}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4 9.33301H28'
        stroke='white'
        strokeWidth='1.6'
        strokeLinecap='round'
      />
      <path
        d='M8 16H24'
        stroke='white'
        strokeWidth='1.6'
        strokeLinecap='round'
      />
      <path
        d='M13.3333 22.667H18.6666'
        stroke='white'
        strokeWidth='1.6'
        strokeLinecap='round'
      />
    </svg>
  );
};

export default SortIcon;
