import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface UpdatePasswordProps extends SvgIconProps {}

const UpdatePasswordIcon: FC<UpdatePasswordProps> = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M22 12C22 17.52 17.52 22 12 22C6.48 22 3.11 16.44 3.11 16.44M3.11 16.44H7.63M3.11 16.44V21.44M2 12C2 6.48 6.44 2 12 2C18.67 2 22 7.56 22 7.56M22 7.56V2.56M22 7.56H17.56M15.9961 12H16.0051M11.998 12H12.007M8 12H8.00898'
        stroke='white'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default UpdatePasswordIcon;
