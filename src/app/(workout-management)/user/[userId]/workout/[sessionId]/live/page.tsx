'use client';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useState } from 'react';

import AthleteTrack from '@/components/LiveTracker/AthleteTrackCanvas';
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
  const [percentage, setPercentage] = useState<number>(0);
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

  // Simulate percentage change for demonstration purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => (prev < 100 ? prev + 1 : 0));
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className='flex flex-row w-full h-full'>
      <div className='text-white mt-[60px] w-[65vw]'>
        {metricLayout.length && (
          <MetricLayoutView metricLayout={metricLayout[0]} isLive />
        )}
      </div>
      <div className='flex flex-col gap-5 flex-1 m-5'>
        {/* <LiveTracker
          totalDistance={600}
          coveredDistance={300}
          lap={3}
          rep={4}
        /> */}
        <AthleteTrack percentage={percentage} />
        <div className='flex justify-center w-full items-center bg-gray-800 rounded-xl'>
          {user?.phone ? (
            <Call
              phoneNumber={`${user?.phone?.countryCodeText}${user?.phone?.number}`}
            />
          ) : (
            <Typo
              level='h4'
              classes='font-secondary font-semibold text-lg p-4 w-fit text-white'
            >
              Please update your phone number
            </Typo>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(LiveScreen);
