'use client';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useMemo } from 'react';

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

  const {
    isUserDetailsPage,
    isUserListingPage,
    isUsersWorkoutDetailsPage,
    isSchedulePage,
  } = useMemo(() => {
    const isUserDetailsPage = pathname.split('/')[1] === 'user';
    const isUserListingPage = pathname.split('/')[1] === 'users';
    const isUsersWorkoutDetailsPage = pathname.split('/')[3] === 'workout';
    const isSchedulePage = pathname.split('/')[1] === 'schedule';
    return {
      isUserDetailsPage,
      isUserListingPage,
      isUsersWorkoutDetailsPage,
      isSchedulePage,
    };
  }, [pathname]);

  const userId = pathname.split('/')[2];

  const {
    setShowUserWorkoutContent,
    fetchUsersList,
    fetchUser,
    fetchUserWorkoutData,
    fetchWorkoutScheduleData,
  } = useStoreActions(
    ({
      UserStore: { setShowUserWorkoutContent, fetchUsersList, fetchUser },
      WorkoutStore: { fetchUserWorkoutData, fetchWorkoutScheduleData },
    }) => ({
      setShowUserWorkoutContent,
      fetchUsersList,
      fetchUser,
      fetchUserWorkoutData,
      fetchWorkoutScheduleData,
    }),
  );
  useEffect(() => {
    if (userId && isUserDetailsPage) fetchUser(userId);

    return () => {
      setShowUserWorkoutContent(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const onTabsClick = (tabs: ITabs) => {
    if (tabs.id === 'workout') {
      setShowUserWorkoutContent(true);
      fetchUserWorkoutData({ userId });
    }
    if (tabs.id === 'overview') setShowUserWorkoutContent(false);
  };

  const onSearch = (term: string) => {
    if (!term) return;
    if (isSchedulePage) {
      fetchWorkoutScheduleData({ search: term, page: 1 });
    } else if (isUserListingPage || isUserDetailsPage)
      fetchUsersList({ search: term, page: 1 });
  };

  return (
    <div
      className={cn(
        'header sticky top-0 z-50 h-[84px] bg-gray-900 py-2.5 px-5 flex flex-row justify-between border-b-[1px] border-b-gray-800',
        className,
      )}
    >
      <LeftHeader leftHeaderClass={leftHeaderClass} onSearch={onSearch} />
      {isUserDetailsPage && !isUsersWorkoutDetailsPage ? (
        <MiddleHeader onTabsClick={onTabsClick} />
      ) : null}
      <RightHeader rightHeaderClass={rightHeaderClass} />
    </div>
  );
};

export default Header;
