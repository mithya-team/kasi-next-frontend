import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface TabsBorderProps extends SvgIconProps {}

const TabsBorderIcon: FC<TabsBorderProps> = (props) => {
  const { className, width, height } = props;

  return (
    <svg
      width={width ?? '72'}
      height={height ?? '44'}
      viewBox='0 0 72 44'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <line y1='43' x2='72' y2='43' stroke='white' strokeWidth='2' />
    </svg>
  );
};

export default TabsBorderIcon;
