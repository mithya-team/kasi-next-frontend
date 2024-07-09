import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface CrossIconProps extends SvgIconProps {}

const CrossIcon: FC<CrossIconProps> = (props) => {
  const { className, width, height } = props;

  return (
    <svg
      width={width ?? '44'}
      height={height ?? '44'}
      className={className}
      viewBox='0 0 44 44'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g filter='url(#filter0_b_2275_19756)'>
        <rect width='44' height='44' rx='10' fill='#1F2937' />
        <rect
          x='0.5'
          y='0.5'
          width='43'
          height='43'
          rx='9.5'
          stroke='url(#paint0_linear_2275_19756)'
        />
        <path
          d='M27 17.0001L17 27M27 26.9999L17 17'
          stroke='white'
          stroke-width='1.5'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
      </g>
      <defs>
        <filter
          id='filter0_b_2275_19756'
          x='-20'
          y='-20'
          width='84'
          height='84'
          filterUnits='userSpaceOnUse'
          color-interpolation-filters='sRGB'
        >
          <feFlood flood-opacity='0' result='BackgroundImageFix' />
          <feGaussianBlur in='BackgroundImageFix' stdDeviation='10' />
          <feComposite
            in2='SourceAlpha'
            operator='in'
            result='effect1_backgroundBlur_2275_19756'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_backgroundBlur_2275_19756'
            result='shape'
          />
        </filter>
        <linearGradient
          id='paint0_linear_2275_19756'
          x1='-3.83341'
          y1='-138.417'
          x2='81.6089'
          y2='-129.543'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#8B5DF5' />
          <stop offset='1' stopColor='#5DE4BB' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default CrossIcon;
