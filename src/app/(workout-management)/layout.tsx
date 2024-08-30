'use client';
import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useStoreActions, useStoreState } from '@/store';

import Header from '@/features/Header';

const WorkoutManagementLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const isUserDetailsPage = pathname.split('/')[1] === 'users';
  const isScheduleScreen = pathname.split('/')[1] === 'schedule';

  const { usersList } = useStoreState(({ UserStore: { usersList } }) => ({
    usersList,
  }));

  const { fetchUsersList, fetchWorkoutScheduleData } = useStoreActions(
    ({
      UserStore: { fetchUsersList },
      WorkoutStore: { fetchWorkoutScheduleData },
    }) => ({
      fetchUsersList,
      fetchWorkoutScheduleData,
    }),
  );

  useEffect(() => {
    if (!usersList?.length && isUserDetailsPage)
      fetchUsersList({ sort: '-createdAt' });
    if (isScheduleScreen) fetchWorkoutScheduleData({ sort: '-createdAt' });
  }, [pathname]);

  return (
    <div className='flex flex-col w-full ml-20 overflow-hidden'>
      <Header />
      <div className='w-full h-full overflow-hidden'>{children}</div>
    </div>
  );
};

export default WorkoutManagementLayout;
