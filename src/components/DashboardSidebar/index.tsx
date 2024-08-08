'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { cn } from '@/lib/utils';

import SvgIcon, { ISvgIconProps } from '@/components/SvgIcon';

import { ROUTE } from '@/constant/route';

interface DashboardSidebarProps {
  className?: string;
}
const links = [
  {
    name: 'users' as ISvgIconProps['name'],
    href: ROUTE.USER_LIST_ROUTE.path,
  },
  {
    name: 'run' as ISvgIconProps['name'],
    href: ROUTE.SCHEDULE_ROUTE.path,
  },
  // {
  //   name: 'subscription' as ISvgIconProps['name'],
  //   href: ROUTE.SUBSCRIPTION_ROUTE.path,
  // },
  {
    name: 'setting' as ISvgIconProps['name'],
    href: ROUTE.SETTING_ROUTE.path,
  },
];
const DashboardSidebar: FC<DashboardSidebarProps> = ({ className }) => {
  const pathname = usePathname();
  return (
    <div
      className={cn(
        'sidebar fixed top-0 left-0 w-20 h-[100vh] border-r-[1px] border-r-gray-800',
        className,
      )}
    >
      <div className='my-[15px] mx-[8px]'>
        <Link href={ROUTE.USER_LIST_ROUTE.path}>
          <Image
            width={64}
            height={54}
            src='/images/kasi_logo.png'
            alt='kasi_logo'
          />
        </Link>
      </div>

      <ul className='py-5 px-3.5 gap-2.5 flex flex-col justify-center items-center'>
        {links?.map(({ name, ...link }, idx) => {
          const isActive = pathname === link.href;
          return (
            <Link className='p-2.5' key={idx} href={link?.href}>
              <SvgIcon name={name} pathFill={isActive ? 'white' : '#6B7280'} />
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default DashboardSidebar;
