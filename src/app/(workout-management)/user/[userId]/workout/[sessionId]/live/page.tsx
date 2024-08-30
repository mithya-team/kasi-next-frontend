'use client';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useMemo, useState } from 'react';

import AthleteTrack from '@/components/AtheleteTrack';
import Typo from '@/components/typography/Typo';

import { useStoreActions, useStoreState } from '@/store';

import { isStraightRunSlug } from '@/constant/straightRunSlug';
import Call from '@/features/BrowserCall';
import { MetricLayoutView } from '@/features/MetricLayouts/MetricLayoutView';
import withAuth from '@/hoc/withAuth';
import {
  getMetricLayouts,
  initializeMetrics,
  updateMetricPrettified,
} from '@/models/workout/workout-metric/workout-metric.adapter';

import STRAIGHT_RUN from '/public/images/straight-run.png';

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
    const res = await fetchWorkoutSessionDetails(sessionId);
    if (res) {
      const { currentSetIndex, currentRepIndex, currentLapIndex, sets } = res;

      const currentSet = sets[currentSetIndex];
      const currentRep = currentSet.reps[currentRepIndex];
      const totalDistance = currentRep.laps[currentLapIndex];
      const elapsedDistance =
        res.workoutData[currentSetIndex].reps[currentRepIndex].laps[
          currentLapIndex
        ].elapsedDistance;

      const newPercentage = (elapsedDistance / totalDistance) * 100 ?? 0;
      setPercentage(newPercentage);
    }
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

  const showStraightRun = useMemo(
    () => isStraightRunSlug(workoutSessionDetails?.workoutSlug),
    [workoutSessionDetails],
  );

  return (
    <div className='flex flex-row w-full h-full'>
      <div className='text-white mt-[60px] w-[65vw]'>
        {metricLayout.length && (
          <MetricLayoutView metricLayout={metricLayout[0]} isLive />
        )}
      </div>
      <div className='flex flex-col gap-5 flex-1 m-5'>
        <div className='bg-gray-800 rounded-xl h-full py-[72px] px-5 flex justify-center items-center'>
          {showStraightRun ? (
            <Image
              src={STRAIGHT_RUN}
              width={288}
              height={544}
              alt='straight-run'
            />
          ) : (
            <div className='relative w-[15rem] h-[29rem] flex flex-col justify-between'>
              <AthleteTrack
                percentage={percentage}
                rep={(workoutSessionDetails?.currentRepIndex ?? 0) + 1}
                lap={(workoutSessionDetails?.currentLapIndex ?? 0) + 1}
              />
            </div>
          )}
        </div>
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
              Cannot initiate phone call. Runner’s phone number not found.
            </Typo>
          )}
        </div>
      </div>
    </div>
  );
};

export default withAuth(LiveScreen);
