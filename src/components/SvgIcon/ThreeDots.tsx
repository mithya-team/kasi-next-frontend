import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface ThreeDotsIconProps extends SvgIconProps {}

const ThreeDots: FC<ThreeDotsIconProps> = (props) => {
  const { className, width, height } = props;

  return (
    <svg
      width={width ?? '6'}
      height={height ?? '24'}
      viewBox='0 0 6 24'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M2.99992 0C1.53325 0 0.333252 1.2 0.333252 2.66667C0.333252 4.13333 1.53325 5.33333 2.99992 5.33333C4.46659 5.33333 5.66658 4.13333 5.66658 2.66667C5.66658 1.2 4.46659 0 2.99992 0ZM2.99992 18.6667C1.53325 18.6667 0.333252 19.8667 0.333252 21.3333C0.333252 22.8 1.53325 24 2.99992 24C4.46659 24 5.66658 22.8 5.66658 21.3333C5.66658 19.8667 4.46659 18.6667 2.99992 18.6667ZM2.99992 9.33333C1.53325 9.33333 0.333252 10.5333 0.333252 12C0.333252 13.4667 1.53325 14.6667 2.99992 14.6667C4.46659 14.6667 5.66658 13.4667 5.66658 12C5.66658 10.5333 4.46659 9.33333 2.99992 9.33333Z'
        fill='#6B7280'
      />
    </svg>
  );
};

export default ThreeDots;
