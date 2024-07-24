import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface DurationIconProps extends SvgIconProps {}

const DurationIcon: FC<DurationIconProps> = (props) => {
  const { className, width, height } = props;

  return (
    <svg
      width={width ?? '24'}
      height={height ?? '24'}
      viewBox='0 0 24 24'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10 2H14'
        stroke='#91E0C8'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 14L15 11'
        stroke='#91E0C8'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 22C16.4183 22 20 18.4183 20 14C20 9.58172 16.4183 6 12 6C7.58172 6 4 9.58172 4 14C4 18.4183 7.58172 22 12 22Z'
        stroke='#91E0C8'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default DurationIcon;
