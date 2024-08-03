import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface MuteIconProps extends SvgIconProps {}

const MuteIcon: FC<MuteIconProps> = (props) => {
  const { className, width, height } = props;

  return (
    <svg
      width={width ?? '25'}
      height={height ?? '24'}
      className={className}
      viewBox='0 0 25 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M16.5 6.3V6C16.5 3.79 14.71 2 12.5 2C10.29 2 8.5 3.79 8.5 6V11'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.54004 14.19C10.27 15 11.33 15.5 12.5 15.5C14.71 15.5 16.5 13.71 16.5 11.5V11'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M7.28027 16.9499C8.65027 18.2199 10.4803 18.9999 12.5003 18.9999C16.7203 18.9999 20.1503 15.5699 20.1503 11.3499V9.6499'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M4.84961 9.6499V11.3499C4.84961 12.4099 5.05961 13.4099 5.44961 14.3299'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20.5697 2.83984L4.42969 18.9898'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.5 3V6'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.5 19V22'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default MuteIcon;
