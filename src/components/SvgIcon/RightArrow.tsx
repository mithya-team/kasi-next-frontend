import { FC } from 'react';

import { SvgIconProps } from '@/components/SvgIcon/@types';

export interface RightArrowIconProps extends SvgIconProps {}

const RightArrowIcon: FC<RightArrowIconProps> = (props) => {
  const { className, width, height, pathFill } = props;

  return (
    <svg
      width={width ?? '8'}
      height={height ?? '14'}
      viewBox='0 0 8 14'
      className={className}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M7.70721 7.37629C7.89468 7.18876 8 6.93445 8 6.66929C8 6.40412 7.89468 6.14982 7.70721 5.96229L2.05021 0.305288C1.95797 0.209778 1.84762 0.133596 1.72562 0.0811869C1.60361 0.0287779 1.47239 0.00119157 1.33961 3.77564e-05C1.20684 -0.00111606 1.07516 0.0241859 0.95226 0.0744668C0.829364 0.124748 0.717711 0.199001 0.623818 0.292893C0.529926 0.386786 0.455673 0.498438 0.405392 0.621334C0.355111 0.744231 0.329809 0.87591 0.330963 1.00869C0.332117 1.14147 0.359703 1.27269 0.412112 1.39469C0.464521 1.5167 0.540703 1.62704 0.636213 1.71929L5.58621 6.66929L0.636213 11.6193C0.454055 11.8079 0.353261 12.0605 0.355539 12.3227C0.357818 12.5849 0.462986 12.8357 0.648395 13.0211C0.833803 13.2065 1.08462 13.3117 1.34681 13.314C1.60901 13.3162 1.86161 13.2154 2.05021 13.0333L7.70721 7.37629Z'
        fill={pathFill ?? 'white'}
      />
    </svg>
  );
};

export default RightArrowIcon;
