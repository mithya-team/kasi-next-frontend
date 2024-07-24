import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface NonExpandedIconProps extends SvgIconProps {}

const NonExpandedIcon: FC<NonExpandedIconProps> = (props) => {
  const { className, width, height, pathFill } = props;

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
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M11.2927 15.7069C11.4802 15.8943 11.7345 15.9996 11.9997 15.9996C12.2648 15.9996 12.5191 15.8943 12.7067 15.7069L18.3637 10.0499C18.4592 9.95761 18.5353 9.84726 18.5878 9.72526C18.6402 9.60326 18.6678 9.47204 18.6689 9.33926C18.6701 9.20648 18.6448 9.0748 18.5945 8.9519C18.5442 8.829 18.4699 8.71735 18.3761 8.62346C18.2822 8.52957 18.1705 8.45531 18.0476 8.40503C17.9247 8.35475 17.793 8.32945 17.6603 8.3306C17.5275 8.33176 17.3963 8.35934 17.2743 8.41175C17.1522 8.46416 17.0419 8.54034 16.9497 8.63585L11.9997 13.5859L7.04966 8.63586C6.86105 8.4537 6.60845 8.3529 6.34626 8.35518C6.08406 8.35746 5.83325 8.46263 5.64784 8.64804C5.46243 8.83344 5.35726 9.08426 5.35498 9.34645C5.3527 9.60865 5.4535 9.86125 5.63566 10.0499L11.2927 15.7069Z'
        fill={pathFill ?? 'white'}
      />
    </svg>
  );
};

export default NonExpandedIcon;
