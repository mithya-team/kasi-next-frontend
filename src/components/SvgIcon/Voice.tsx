import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface VoiceIconProps extends SvgIconProps {}

const VoiceIcon: FC<VoiceIconProps> = (props) => {
  const { className, width, height } = props;

  return (
    <svg
      width={width ?? '24'}
      height={height ?? '24'}
      className={className}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12 15.5C14.21 15.5 16 13.71 16 11.5V6C16 3.79 14.21 2 12 2C9.79 2 8 3.79 8 6V11.5C8 13.71 9.79 15.5 12 15.5Z'
        stroke='white'
        stroke-width='1.6'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M4.3501 9.65039V11.3504C4.3501 15.5704 7.7801 19.0004 12.0001 19.0004C16.2201 19.0004 19.6501 15.5704 19.6501 11.3504V9.65039'
        stroke='white'
        stroke-width='1.6'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M10.6099 6.43012C11.5099 6.10012 12.4899 6.10012 13.3899 6.43012'
        stroke='white'
        stroke-width='1.6'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M11.2002 8.55031C11.7302 8.41031 12.2802 8.41031 12.8102 8.55031'
        stroke='white'
        stroke-width='1.6'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M12 19V22'
        stroke='white'
        stroke-width='1.6'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
};

export default VoiceIcon;
