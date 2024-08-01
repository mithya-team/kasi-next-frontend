import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface EndCallIconProps extends SvgIconProps {}

const EndCallIcon: FC<EndCallIconProps> = (props) => {
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
        d='M10.8203 18.97C10.9603 19.08 11.1003 19.18 11.2503 19.29C12.3903 20.12 13.5403 20.78 14.6903 21.27C15.8403 21.76 16.9303 22 17.9503 22C18.6503 22 19.3003 21.87 19.9003 21.62C20.5103 21.37 21.0503 20.98 21.5403 20.44C21.8303 20.12 22.0503 19.78 22.2203 19.42C22.3903 19.06 22.4703 18.69 22.4703 18.33C22.4703 18.05 22.4103 17.8 22.3103 17.55C22.2003 17.3 22.0203 17.09 21.7603 16.91L18.4503 14.56C18.2003 14.39 17.9703 14.26 17.7503 14.17C17.5303 14.08 17.3303 14.04 17.1403 14.04C16.8903 14.04 16.6603 14.11 16.4303 14.25C16.2003 14.37 15.9603 14.56 15.7103 14.81L14.9503 15.56C14.8403 15.67 14.7103 15.73 14.5403 15.73C14.4503 15.73 14.3703 15.72 14.2903 15.69C14.2203 15.66 14.1603 15.63 14.1103 15.61C13.9203 15.51 13.7003 15.37 13.4603 15.19'
        stroke='white'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M11.23 13.22C10.71 12.69 10.23 12.16 9.78 11.64C9.34 11.12 9.03 10.69 8.85 10.36C8.83 10.3 8.8 10.24 8.77 10.16C8.75 10.08 8.74 10.01 8.74 9.93C8.74 9.77 8.79 9.64 8.9 9.53L9.66 8.74C9.9 8.5 10.09 8.26 10.22 8.03C10.36 7.8 10.43 7.56 10.43 7.32C10.43 7.13 10.38 6.92 10.29 6.71C10.2 6.49 10.07 6.26 9.89 6.01L7.57 2.74C7.39 2.48 7.16 2.3 6.9 2.18C6.65 2.06 6.37 2 6.09 2C5.35 2 4.65 2.31 4.01 2.94C3.48 3.44 3.1 4 2.86 4.61C2.62 5.21 2.5 5.86 2.5 6.54C2.5 7.58 2.74 8.67 3.22 9.81C3.7 10.94 4.36 12.08 5.18 13.22C6.01 14.36 6.94 15.45 7.97 16.49'
        stroke='white'
        strokeWidth='1.5'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M22.5 2L2.5 22'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default EndCallIcon;
