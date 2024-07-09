import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface DownArrowIconProps extends SvgIconProps {}

const DownArrowIcon: FC<DownArrowIconProps> = (props) => {
  const { className, width, height, pathFill } = props;

  return (
    <svg
      width={width ?? '24'}
      height={height ?? '24'}
      viewBox='0 0 24 24'
      fill='none'
      className={className}
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_2404_8403)'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M12.7071 15.7073C12.5196 15.8948 12.2653 16.0001 12.0001 16.0001C11.7349 16.0001 11.4806 15.8948 11.2931 15.7073L5.6361 10.0503C5.54059 9.9581 5.46441 9.84775 5.412 9.72575C5.35959 9.60374 5.332 9.47252 5.33085 9.33974C5.32969 9.20696 5.355 9.07529 5.40528 8.95239C5.45556 8.82949 5.52981 8.71784 5.6237 8.62395C5.7176 8.53006 5.82925 8.4558 5.95214 8.40552C6.07504 8.35524 6.20672 8.32994 6.3395 8.33109C6.47228 8.33225 6.6035 8.35983 6.7255 8.41224C6.84751 8.46465 6.95785 8.54083 7.0501 8.63634L12.0001 13.5863L16.9501 8.63634C17.1387 8.45418 17.3913 8.35339 17.6535 8.35567C17.9157 8.35795 18.1665 8.46312 18.3519 8.64852C18.5373 8.83393 18.6425 9.08474 18.6448 9.34694C18.6471 9.60914 18.5463 9.86174 18.3641 10.0503L12.7071 15.7073Z'
          fill={pathFill ?? 'white'}
        />
      </g>
      <defs>
        <clipPath id='clip0_2404_8403'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DownArrowIcon;
