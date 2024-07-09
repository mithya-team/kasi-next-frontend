import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface UserIconProps extends SvgIconProps {}

const UserIcon: FC<UserIconProps> = (props) => {
  const { className, width, height } = props;

  return (
    <svg
      width={width ?? '16'}
      height={height ?? '18'}
      className={className}
      viewBox='0 0 16 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M8 9.88889C10.4162 9.88889 12.375 7.89904 12.375 5.44444C12.375 2.98985 10.4162 1 8 1C5.58375 1 3.625 2.98985 3.625 5.44444C3.625 7.89904 5.58375 9.88889 8 9.88889ZM8 9.88889C9.85652 9.88889 11.637 10.6381 12.9497 11.9717C14.2625 13.3053 15 15.114 15 17M8 9.88889C6.14348 9.88889 4.36301 10.6381 3.05025 11.9717C1.7375 13.3053 1 15.114 1 17'
        stroke='white'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default UserIcon;
