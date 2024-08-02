'use client';
import { usePathname } from 'next/navigation';
import { FC, useEffect } from 'react';

import { useStoreActions, useStoreState } from '@/store';

import Call from '@/features/BrowserCall';
import { MetricLayoutView } from '@/features/MetricLayouts/MetricLayoutView';
import withAuth from '@/hoc/withAuth';
import {
  getMetricLayouts,
  initializeMetrics,
  updateMetricPrettified,
} from '@/models/workout/workout-metric/workout-metric.adapter';

const POLLING_INTERVAL = 5000; // 5 seconds

const LiveScreen: FC = () => {
  const pathname = usePathname();
  const sessionId = pathname.split('/')[2];
  const { workoutSessionDetails, workoutDataByConfigSlug } = useStoreState(
    ({ WorkoutStore: { workoutSessionDetails, workoutDataByConfigSlug } }) => ({
      workoutSessionDetails,
      workoutDataByConfigSlug,
    }),
  );

  const { fetchWorkoutSessionDetails } = useStoreActions(
    ({ WorkoutStore: { fetchWorkoutSessionDetails } }) => ({
      fetchWorkoutSessionDetails,
    }),
  );

  const fetchData = async () => {
    if (!sessionId) return;
    await fetchWorkoutSessionDetails(sessionId);
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, POLLING_INTERVAL); // Polling

    return () => clearInterval(intervalId);
  }, [fetchWorkoutSessionDetails, sessionId]);

  const metricPrettified = initializeMetrics(
    workoutDataByConfigSlug?.impMetrics,
    workoutSessionDetails?.lengthUnit,
  );

  const updatedMetricPrettified = updateMetricPrettified(
    workoutSessionDetails,
    metricPrettified,
  );

  const metricLayout = getMetricLayouts(
    workoutDataByConfigSlug,
    workoutSessionDetails,
    updatedMetricPrettified,
  );

  return (
    <div className='relative flex flex-row w-full h-full'>
      <div className='text-white mt-[60px] w-[60vw] flex flex-col gap-5'>
        <div className='flex flex-col justify-center items-center mt-5'>
          {metricLayout.length && (
            <MetricLayoutView metricLayout={metricLayout[0]} />
          )}
        </div>
      </div>
      <div className='fixed flex bottom-5 justify-center items-center right-7 bg-gray-800 rounded-xl w-fit'>
        <Call phoneNumber='+918777250782' />
      </div>
    </div>
  );
};

export default withAuth(LiveScreen);
