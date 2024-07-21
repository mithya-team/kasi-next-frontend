'use client';
import { usePathname } from 'next/navigation';
import { FC, useEffect } from 'react';

import { useStoreActions, useStoreState } from '@/store';

const PastScreen: FC = () => {
  const pathname = usePathname();
  const sessionId = pathname.split('/')[2];

  const { workoutSessionDetails } = useStoreState(
    ({ WorkoutStore: { workoutSessionDetails, workoutDataByConfigSlug } }) => ({
      workoutSessionDetails,
      workoutDataByConfigSlug,
    }),
  );

  const { fetchWorkoutSessionDetails, fetchWorkoutDataByConfigSlug } =
    useStoreActions(
      ({
        WorkoutStore: {
          fetchWorkoutSessionDetails,
          fetchWorkoutDataByConfigSlug,
        },
      }) => ({
        fetchWorkoutSessionDetails,
        fetchWorkoutDataByConfigSlug,
      }),
    );

  useEffect(() => {
    if (sessionId) fetchWorkoutSessionDetails(sessionId);
    if (workoutSessionDetails)
      fetchWorkoutDataByConfigSlug(workoutSessionDetails?.workoutSlug);
  }, [sessionId, workoutSessionDetails?.workoutSlug]);

  return <div className='text-white'>past screen</div>;
};

export default PastScreen;
