import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface UsersIconProps extends SvgIconProps {}

const UsersIcon: FC<UsersIconProps> = (props) => {
  const { className, width, height, pathFill } = props;

  return (
    <svg
      width={width ?? '32'}
      height={height ?? '32'}
      className={className}
      viewBox='0 0 32 32'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.2134 14.4932C12.0801 14.4798 11.9201 14.4798 11.7734 14.4932C8.60008 14.3865 6.08008 11.7865 6.08008 8.5865C6.08008 5.31984 8.72008 2.6665 12.0001 2.6665C15.2667 2.6665 17.9201 5.31984 17.9201 8.5865C17.9067 11.7865 15.3867 14.3865 12.2134 14.4932Z'
        stroke={pathFill ?? 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M21.8801 5.3335C24.4668 5.3335 26.5468 7.42683 26.5468 10.0002C26.5468 12.5202 24.5468 14.5735 22.0535 14.6668C21.9468 14.6535 21.8268 14.6535 21.7068 14.6668'
        stroke={pathFill ?? 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M5.54671 19.4135C2.32004 21.5735 2.32004 25.0935 5.54671 27.2402C9.21338 29.6935 15.2267 29.6935 18.8934 27.2402C22.12 25.0802 22.12 21.5602 18.8934 19.4135C15.24 16.9735 9.22671 16.9735 5.54671 19.4135Z'
        stroke={pathFill ?? 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M24.4534 26.6665C25.4134 26.4665 26.32 26.0798 27.0667 25.5065C29.1467 23.9465 29.1467 21.3732 27.0667 19.8132C26.3334 19.2532 25.44 18.8798 24.4934 18.6665'
        stroke={pathFill ?? 'white'}
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default UsersIcon;
