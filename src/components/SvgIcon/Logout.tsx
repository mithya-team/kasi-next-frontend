import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface LogoutIconProps extends SvgIconProps {}

const LogoutIcon: FC<LogoutIconProps> = (props) => {
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
        d='M17.4399 14.62L19.9999 12.06L17.4399 9.5'
        stroke='white'
        strokeWidth='1.6'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.76001 12.0596H19.93'
        stroke='white'
        strokeWidth='1.6'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.76 20C7.34001 20 3.76001 17 3.76001 12C3.76001 7 7.34001 4 11.76 4'
        stroke='white'
        strokeWidth='1.6'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default LogoutIcon;
