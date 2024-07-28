import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface CodeIconProps extends SvgIconProps {}

const CodeIcon: FC<CodeIconProps> = (props) => {
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
        d='M8.56544 14H8.57571M11.9958 14H12.006M15.4261 14H15.4364M8.56544 17.5H8.57571M11.9958 17.5H12.006M15.4261 17.5H15.4364M10.2222 22H13.7778C18.2222 22 20 20 20 15V9C20 4 18.2222 2 13.7778 2H10.2222C5.77778 2 4 4 4 9V15C4 20 5.77778 22 10.2222 22ZM16 7.58008V8.58008C16 9.40008 15.4044 10.0801 14.6667 10.0801H9.33333C8.60444 10.0801 8 9.41008 8 8.58008V7.58008C8 6.76008 8.59556 6.08008 9.33333 6.08008H14.6667C15.4044 6.08008 16 6.75008 16 7.58008Z'
        stroke='white'
        strokeWidth='1.6'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default CodeIcon;
