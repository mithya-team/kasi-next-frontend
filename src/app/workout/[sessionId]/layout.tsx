'use client';
import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren, useMemo } from 'react';

import DashboardSidebar from '@/components/DashboardSidebar';
import WorkoutLeftHeader from '@/components/WorkoutLeftHeader';

import { useStoreState } from '@/store';

import RightHeader from '@/features/Header/RightHeader';
import { WorkoutSessionStatus } from '@/models/workout/workout.types';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const sessionId = pathname.split('/')[2];

  const { user, userWorkoutData } = useStoreState(
    ({ UserStore: { user }, WorkoutStore: { userWorkoutData } }) => ({
      user,
      userWorkoutData,
    }),
  );

  const workoutData = useMemo(() => {
    return userWorkoutData?.find((workout) => workout?._id === sessionId);
  }, [userWorkoutData, user, pathname]);

  return (
    <div className='flex flex-row min-h-screen bg-gray-900'>
      <DashboardSidebar />
      <div className='flex flex-col w-full ml-20'>
        <div className='items-center header sticky top-0 z-50 h-[84px] bg-gray-900 flex flex-row justify-between border-b-[1px] border-b-gray-800'>
          <WorkoutLeftHeader
            userName={user?.fullName ?? ''}
            startTime={workoutData?.startTime ?? ''}
            status={workoutData?.status ?? WorkoutSessionStatus?.YET_TO_START}
            workoutName={workoutData?.workoutConfig?.name ?? ''}
          />
          <RightHeader />
        </div>
        <div className='flex-1 overflow-auto'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
