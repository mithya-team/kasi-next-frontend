import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { cn } from '@/lib/utils';
import useAuthActions from '@/hooks/useAuthActions';

import Button from '@/components/Buttons';
import Popover from '@/components/Popover';
import SvgIcon, { IconName, ISvgIconProps } from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { useStoreState } from '@/store';

import { ROUTE } from '@/constant/route';

export interface RightHeaderProps {
  rightHeaderClass?: string;
}
const RightHeader: FC<RightHeaderProps> = ({ rightHeaderClass }) => {
  const { admin } = useStoreState(({ AdminStore: { admin } }) => ({ admin }));

  const [openPopover, setOpenPopover] = useState(false);

  const closePopover = () => setOpenPopover(false);

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
          {admin?.fullName ?? ''}
        </Typo>
        <Popover
          open={openPopover}
          onOpenChange={setOpenPopover}
          content={<PopoverContent closePopover={closePopover} />}
        >
          <div
            onClick={() => setOpenPopover(!openPopover)}
            className='w-6 flex justify-center items-center'
          >
            <SvgIcon name='down-arrow' />
          </div>
        </Popover>
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

interface PopoverContentProps {
  closePopover: () => void;
}

const PopoverContent: FC<PopoverContentProps> = ({ closePopover }) => {
  const { logout } = useAuthActions();
  const router = useRouter();

  const contentConfig = [
    {
      title: 'Settings',
      icon: 'setting' as IconName,
      onClick: () => {
        router.push(ROUTE.SETTING_ROUTE.path);
        closePopover();
      },
    },
    {
      title: 'Payments',
      icon: 'payment' as IconName,
      onClick: () => {
        router.push(ROUTE.SUBSCRIPTION_ROUTE.path);
        closePopover();
      },
    },
    {
      title: 'Sign Out',
      icon: 'logout' as IconName,
      onClick: async () => {
        await logout();
        closePopover();
      },
    },
  ];

  return contentConfig.map((config, idx) => (
    <div key={idx} className=''>
      <Button
        onClick={config?.onClick}
        className='flex flex-row justify-start gap-3 py-2 w-full'
      >
        <SvgIcon name={config.icon} className='w-6 h-6' />
        <span className='font-primary font-medium text-gray-50'>
          {config.title}
        </span>
      </Button>
      <div className='w-full h-[1px] opacity-20 bg-gray-1' />
    </div>
  ));
};
