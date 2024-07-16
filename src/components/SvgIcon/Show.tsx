import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';
export interface ShowIconProps extends SvgIconProps {}

const ShowIcon: FC<ShowIconProps> = (props) => {
  const { className, width, height } = props;

  return (
    <svg
      width={width ?? '22'}
      height={height ?? '19'}
      viewBox='0 0 22 19'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M14.365 9.28C14.365 11.26 12.765 12.86 10.785 12.86C8.805 12.86 7.205 11.26 7.205 9.28C7.205 7.3 8.805 5.7 10.785 5.7C12.765 5.7 14.365 7.3 14.365 9.28Z'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.785 17.55C14.315 17.55 17.605 15.47 19.895 11.87C20.795 10.46 20.795 8.09 19.895 6.68C17.605 3.08 14.315 1 10.785 1C7.255 1 3.965 3.08 1.675 6.68C0.775 8.09 0.775 10.46 1.675 11.87C3.965 15.47 7.255 17.55 10.785 17.55Z'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default ShowIcon;
