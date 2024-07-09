import { FC } from 'react';

import { cn } from '@/lib/utils';

import SvgIcon, { ISvgIconProps } from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

export interface RightHeaderProps {
  rightHeaderClass?: string;
}
const RightHeader: FC<RightHeaderProps> = ({ rightHeaderClass }) => {
  return (
    <div
      className={cn(
        'right-header flex flex-row gap-5 justify-center items-center',
        rightHeaderClass,
      )}
    >
      {rightHeaderNavs?.map(({ name, ...nav }, index) => (
        <div
          className='px-[18px] py-[15px] w-[54px] h-[54px] rounded-xl flex flex-row border-[1px] gap-5 border-gray-600'
          key={index}
        >
          <SvgIcon name={name} {...nav} />
        </div>
      ))}
      <div className='ml-3 flex flex-row justify-center items-center gap-3'>
        <Typo
          level='h4'
          classes='text-gray-50 font-semibold leading-7 -tracking-[0.1px]'
        >
          sanjay
        </Typo>
        <SvgIcon name='down-arrow' />
      </div>
    </div>
  );
};

export default RightHeader;

interface INavs {
  name: ISvgIconProps['name'];
  width: string;
  height: string;
}

const rightHeaderNavs: INavs[] = [
  {
    name: 'notification',
    width: '18',
    height: '24',
  },
  {
    name: 'profile',
    width: '20',
    height: '20',
  },
];
