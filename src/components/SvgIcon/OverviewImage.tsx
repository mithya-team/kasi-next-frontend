import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface OverviewIconProps extends SvgIconProps {}

const OverviewImageIcon: FC<OverviewIconProps> = (props) => {
  const { className } = props;

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width='204'
      height='92'
      viewBox='0 0 204 92'
      fill='none'
    >
      <g opacity='0.2'>
        <circle
          opacity='0.4'
          cx='89.249'
          cy='114.333'
          r='68.7696'
          transform='rotate(20.8614 89.249 114.333)'
          fill='url(#paint0_linear_2994_1971)'
        />
        <circle
          opacity='0.2'
          cx='175.671'
          cy='75.6783'
          r='74.8404'
          fill='url(#paint1_linear_2994_1971)'
        />
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_2994_1971'
          x1='89.249'
          y1='45.5633'
          x2='89.249'
          y2='183.102'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' />
          <stop offset='1' stopColor='white' stopOpacity='0' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_2994_1971'
          x1='175.671'
          y1='0.837891'
          x2='175.671'
          y2='150.519'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='white' />
          <stop offset='1' stopColor='white' stopOpacity='0' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default OverviewImageIcon;
