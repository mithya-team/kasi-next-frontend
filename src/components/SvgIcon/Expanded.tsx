import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface ExpandedIconProps extends SvgIconProps {}

const ExpandedIcon: FC<ExpandedIconProps> = (props) => {
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
        d='M11.2927 8.29315C11.4802 8.10567 11.7345 8.00036 11.9997 8.00036C12.2648 8.00036 12.5191 8.10567 12.7067 8.29315L18.3637 13.9501C18.4592 14.0424 18.5353 14.1527 18.5878 14.2747C18.6402 14.3967 18.6678 14.528 18.6689 14.6607C18.6701 14.7935 18.6448 14.9252 18.5945 15.0481C18.5442 15.171 18.4699 15.2826 18.3761 15.3765C18.2822 15.4704 18.1705 15.5447 18.0476 15.595C17.9247 15.6452 17.793 15.6705 17.6603 15.6694C17.5275 15.6682 17.3963 15.6407 17.2743 15.5882C17.1522 15.5358 17.0419 15.4597 16.9497 15.3641L11.9997 10.4141L7.04966 15.3641C6.86105 15.5463 6.60845 15.6471 6.34626 15.6448C6.08406 15.6425 5.83325 15.5374 5.64784 15.352C5.46243 15.1666 5.35726 14.9157 5.35498 14.6535C5.3527 14.3913 5.4535 14.1387 5.63566 13.9501L11.2927 8.29315Z'
        fill={pathFill ?? 'white'}
      />
    </svg>
  );
};

export default ExpandedIcon;
