'use client';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useStoreActions } from '@/store';

const WorkoutLayout: FC<PropsWithChildren> = ({ children }) => {
  const { setIsWorkoutDetailPage } = useStoreActions(
    ({ WorkoutStore: { setIsWorkoutDetailPage } }) => ({
      setIsWorkoutDetailPage,
    }),
  );

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
