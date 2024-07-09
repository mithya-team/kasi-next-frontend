'use client';
import { usePathname } from 'next/navigation';
import { FC, useEffect } from 'react';

import { cn } from '@/lib/utils';

import { useStoreActions } from '@/store';

import MiddleHeader, { ITabs } from '@/features/Header/MiddleHeader';

import LeftHeader from './LeftHeader';
import RightHeader from './RightHeader';

export interface HeaderProps {
  className?: string;
  leftHeaderClass?: string;
  rightHeaderClass?: string;
}
const Header: FC<HeaderProps> = ({
  className,
  leftHeaderClass,
  rightHeaderClass,
}) => {
  const pathname = usePathname();
  const isUserDetailsPage = pathname.split('/')[1] === 'user';
  const userId = pathname.split('/')[2];

  const { setShowUserWorkoutContent, fetchUsers, fetchUser } = useStoreActions(
    (store) => ({
      setShowUserWorkoutContent: store.UserStore.setShowUserWorkoutContent,
      fetchUsers: store.UsersListStore.fetchUsers,
      fetchUser: store.UserStore.fetchUser,
    }),
  );

  useEffect(() => {
    if (userId) fetchUser(userId);

    return () => {
      setShowUserWorkoutContent(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const onTabsClick = (tabs: ITabs) => {
    if (tabs.id === 'workout') setShowUserWorkoutContent(true);
    if (tabs.id === 'overview') setShowUserWorkoutContent(false);
  };

  return (
    <div
      className={cn(
        'header sticky top-0 z-50 h-[84px] bg-gray-900 py-2.5 px-5 flex flex-row justify-between border-b-[1px] border-b-gray-800',
        className,
      )}
    >
      <LeftHeader
        leftHeaderClass={leftHeaderClass}
        onSearch={(term) => fetchUsers({ search: term })}
      />
      {isUserDetailsPage ? <MiddleHeader onTabsClick={onTabsClick} /> : null}
      <RightHeader rightHeaderClass={rightHeaderClass} />
    </div>
  );
};

export default Header;
