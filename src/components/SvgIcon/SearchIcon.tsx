import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';
export interface SearchIconProps extends SvgIconProps {}

const SearchIcon: FC<SearchIconProps> = (props) => {
  const { className, width, height } = props;

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
        d='M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z'
        stroke='#D1D5DB'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M20.9999 21.0004L16.6499 16.6504'
        stroke='#D1D5DB'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default SearchIcon;
