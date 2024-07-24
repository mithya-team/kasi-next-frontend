import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface DistanceIconProps extends SvgIconProps {}

const DeleteUserIcon: FC<DistanceIconProps> = () => {
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
        d='M199 62.3587C191.97 61.6657 184.898 61.3088 177.847 61.3088C173.667 61.3088 169.487 61.5187 165.307 61.9387L161 62.3587M172.611 60.2368L173.076 57.4859C173.413 55.491 173.667 54 177.234 54H182.766C186.333 54 186.608 55.575 186.924 57.5069L187.389 60.2368M194.462 68.9948L193.09 90.1412C192.857 93.4381 192.667 96 186.777 96H173.224C167.334 96 167.144 93.4381 166.912 90.1412L165.54 68.9948M176.475 84.449H183.505M174.722 76.0493H185.278'
        stroke='white'
        strokeWidth='2.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default DeleteUserIcon;
