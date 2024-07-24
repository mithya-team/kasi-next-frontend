import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface CopyIconProps extends SvgIconProps {}

const CopyIcon: FC<CopyIconProps> = (props) => {
  const { className, width, height } = props;

  return (
    <svg
      width={width ?? '37'}
      height={height ?? '36'}
      className={className}
      viewBox='0 0 37 36'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.5 15.667C13.5 14.9597 13.781 14.2813 14.2811 13.7811C14.7813 13.281 15.4597 13 16.167 13H24.833C25.1832 13 25.53 13.069 25.8536 13.203C26.1772 13.337 26.4712 13.5335 26.7189 13.7811C26.9665 14.0288 27.163 14.3228 27.297 14.6464C27.431 14.97 27.5 15.3168 27.5 15.667V24.333C27.5 24.6832 27.431 25.03 27.297 25.3536C27.163 25.6772 26.9665 25.9712 26.7189 26.2189C26.4712 26.4665 26.1772 26.663 25.8536 26.797C25.53 26.931 25.1832 27 24.833 27H16.167C15.8168 27 15.47 26.931 15.1464 26.797C14.8228 26.663 14.5288 26.4665 14.2811 26.2189C14.0335 25.9712 13.837 25.6772 13.703 25.3536C13.569 25.03 13.5 24.6832 13.5 24.333V15.667Z'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M10.512 22.737C10.205 22.5626 9.94965 22.31 9.7719 22.0049C9.59415 21.6998 9.50034 21.3531 9.5 21V11C9.5 9.9 10.4 9 11.5 9H21.5C22.25 9 22.658 9.385 23 10'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default CopyIcon;
