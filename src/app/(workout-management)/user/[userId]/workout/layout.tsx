'use client';
import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useStoreActions, useStoreState } from '@/store';

const WorkoutLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const clientId = pathname.split('/')[2];
  const sessionId = pathname.split('/')[4];

  const { workoutSessionDetails } = useStoreState(
    ({ WorkoutStore: { workoutSessionDetails } }) => ({
      workoutSessionDetails,
    }),
  );

  const {
    fetchWorkoutSessionDetails,
    fetchWorkoutDataByConfigSlug,
    setIsWorkoutDetailPage,
    fetchUserWorkoutData,
    fetchUser,
  } = useStoreActions(
    ({
      WorkoutStore: {
        fetchWorkoutSessionDetails,
        fetchWorkoutDataByConfigSlug,
        setIsWorkoutDetailPage,
        fetchUserWorkoutData,
      },
      UserStore: { fetchUser },
    }) => ({
      fetchWorkoutSessionDetails,
      fetchWorkoutDataByConfigSlug,
      setIsWorkoutDetailPage,
      fetchUserWorkoutData,
      fetchUser,
    }),
  );

  useEffect(() => {
    if (clientId) fetchUser(clientId);
    if (sessionId) fetchWorkoutSessionDetails(sessionId);
    if (workoutSessionDetails)
      fetchWorkoutDataByConfigSlug(workoutSessionDetails?.workoutSlug);
    if (workoutSessionDetails?.userId)
      fetchUserWorkoutData({ userId: workoutSessionDetails?.userId });
  }, [sessionId, workoutSessionDetails?.workoutSlug]);

  useEffect(() => {
    // Set isWorkoutDetailPage to true when the component mounts
    setIsWorkoutDetailPage(true);

    // Cleanup function to set isWorkoutDetailPage to false when the component unmounts
    return () => {
      setIsWorkoutDetailPage(false);
    };
  }, []);

  return <> {children}</>;
};
export default WorkoutLayout;
