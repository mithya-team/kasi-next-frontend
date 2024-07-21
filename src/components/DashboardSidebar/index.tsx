import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';

import { cn } from '@/lib/utils';

import SvgIcon, { ISvgIconProps } from '@/components/SvgIcon';

interface DashboardSidebarProps {
  className?: string;
}
const links = [
  {
    name: 'users' as ISvgIconProps['name'],
    href: '/users',
  },
  {
    name: 'run' as ISvgIconProps['name'],
    href: '/schedule',
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
      <Link className='py-[15px] pl-[8px]' href='/users'>
        <Image
          width={64}
          height={54}
          src='/images/kasi_logo.png'
          alt='kasi_logo'
        />
      </Link>
      <ul className='p-5 gap-2.5'>
        {links?.map(({ name, ...link }, idx) => {
          const isActive = pathname === link.href;
          return (
            <Link className='py-2 px-2.5' key={idx} href={link?.href}>
              <SvgIcon name={name} pathFill={isActive ? 'white' : '#6B7280'} />
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default DashboardSidebar;
