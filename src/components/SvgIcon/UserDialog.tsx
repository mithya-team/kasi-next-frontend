import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface UserDialogIconProps extends SvgIconProps {}

const UserDialogIcon: FC<UserDialogIconProps> = () => {
  return (
    <svg
      width='360'
      height='150'
      viewBox='0 0 360 150'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='180' cy='74.5' r='70' fill='white' fillOpacity='0.04' />
      <circle cx='180.5' cy='75' r='43.5' fill='white' fillOpacity='0.04' />
      <path
        d='M194.423 88.7021L188.078 95.0471'
        stroke='white'
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M194.423 95.0471L188.078 88.7021'
        stroke='white'
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M180.36 72.4575C180.135 72.435 179.865 72.435 179.617 72.4575C174.262 72.2775 170.01 67.89 170.01 62.49C170.01 56.9775 174.465 52.5 180 52.5C185.512 52.5 189.99 56.9775 189.99 62.49C189.967 67.89 185.715 72.2775 180.36 72.4575Z'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M180 97.0728C175.905 97.0728 171.832 96.0378 168.727 93.9678C163.282 90.3228 163.282 84.3828 168.727 80.7603C174.915 76.6203 185.062 76.6203 191.25 80.7603'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default UserDialogIcon;
