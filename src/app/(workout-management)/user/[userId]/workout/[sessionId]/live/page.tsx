'use client';
import { usePathname } from 'next/navigation';
import { FC, useEffect } from 'react';

import Typo from '@/components/typography/Typo';

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
  const sessionId = pathname.split('/')[4];
  const { workoutSessionDetails, workoutDataByConfigSlug, user } =
    useStoreState(
      ({
        WorkoutStore: { workoutSessionDetails, workoutDataByConfigSlug },
        UserStore: { user },
      }) => ({
        workoutSessionDetails,
        workoutDataByConfigSlug,
        user,
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
        <div className='flex flex-col justify-center items-center mt-5 min-w-[23rem] mx-auto'>
          {metricLayout.length && (
            <MetricLayoutView
              metricLayout={metricLayout[0]}
              className='w-[50%]'
              singleMatricesClass='justify-center'
            />
          )}
        </div>
      </div>
      <div className='fixed flex bottom-5 justify-center items-center right-7 bg-gray-800 rounded-xl w-fit'>
        {user?.phone ? (
          <Call
            phoneNumber={`${user?.phone?.countryCode}${user?.phone?.number}`}
          />
        ) : (
          <Typo
            level='h4'
            classes='font-secondary font-semibold text-lg p-4 text-white'
          >
            Please update your phone number
          </Typo>
        )}
      </div>
    </div>
  );
};

export default withAuth(LiveScreen);
