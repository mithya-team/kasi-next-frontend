'use client';
import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren } from 'react';

import Typo from '@/components/typography/Typo';

import RightHeader from '@/features/Header/RightHeader';

const AccountLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();

  const isSettingPage = pathname.split('/')[1] === 'settings';
  return (
    <div className='flex flex-col w-full ml-20'>
      <div className='header sticky top-0 z-50 h-[84px] bg-gray-900 py-2.5 px-5 flex flex-row justify-between border-b-[1px] border-b-gray-800'>
        <Typo
          classes='ml-6 flex items-center text-center font-secondary tracking-[-0.1px] text-gray-50'
          level='h4'
        >
          {isSettingPage ? 'Settings' : 'Subscriptions'}
        </Typo>
        <RightHeader />
      </div>
      {children}
    </div>
  );
};

export default AccountLayout;
