import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface GoogleIconProps extends SvgIconProps {}

const FlagIcon: FC<GoogleIconProps> = (props) => {
  const { className, width, height } = props;

  return (
    <svg
      width={width ?? '16'}
      height={height ?? '16'}
      className={className}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.33301 13.9998V2.6665H9.33301L9.59967 3.99984H13.333V10.6665H8.66634L8.39967 9.33317H4.66634V13.9998H3.33301Z'
        fill='#A78BFA'
      />
    </svg>
  );
};

export default FlagIcon;
