import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface HideIconProps extends SvgIconProps {}

const HideIcon: FC<HideIconProps> = (props) => {
  const { className, width, height } = props;

  return (
    <svg
      width={width ?? '20'}
      height={height ?? '20'}
      viewBox='0 0 20 20'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M12.2769 7.72292L7.72292 12.2769M12.2769 7.72292C11.6919 7.13792 10.8909 6.77792 9.99992 6.77792C8.21792 6.77792 6.77792 8.21792 6.77792 9.99992C6.77792 10.8909 7.13792 11.6919 7.72292 12.2769M12.2769 7.72292L19.0002 1M7.72292 12.2769L1 19M15.2378 4.39298C13.6628 3.20498 11.8628 2.55698 9.99985 2.55698C6.82285 2.55698 3.86186 4.42898 1.80086 7.66897C0.990859 8.93797 0.990859 11.071 1.80086 12.34C2.51186 13.456 3.33986 14.419 4.23985 15.193M6.77792 16.7769C7.80392 17.2089 8.89292 17.4429 9.99992 17.4429C13.1769 17.4429 16.1379 15.5709 18.1989 12.3309C19.0089 11.0619 19.0089 8.92893 18.1989 7.65993C17.9019 7.19193 17.5779 6.75093 17.2449 6.33693M13.1594 10.6299C12.9254 11.8989 11.8904 12.9339 10.6214 13.1679'
        stroke='white'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default HideIcon;
