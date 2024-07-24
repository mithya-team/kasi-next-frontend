import React from 'react';

import { formatDuration } from '@/lib/utils';

import Typo from '@/components/typography/Typo';
import WorkoutStatus from '@/components/WorkoutStatus';

import { useStoreState } from '@/store';

import {
  ImpMetrices,
  SegmentDuration,
  WorkoutSessionStatus,
} from '@/models/workout/workout.types';

interface RepCardProps {
  isLive?: boolean;
}

const MetricsCard: React.FC<RepCardProps> = ({ isLive = false }) => {
  const { workoutSessionDetails, workoutDataByConfigSlug } = useStoreState(
    ({ WorkoutStore: { workoutSessionDetails, workoutDataByConfigSlug } }) => ({
      workoutSessionDetails,
      workoutDataByConfigSlug,
    }),
  );
  return (
    <>
      {workoutSessionDetails?.workoutData[0]?.reps.map((rep, idx) => {
        return (
          <div
            key={idx}
            className='w-[21.875rem] flex flex-col gap-4 mx-auto relative'
          >
            <Typo
              level='h3'
              classes='font-semibold  font-secondary  tracking-[-0.144px] text-center'
            >
              Time for each kilometer
            </Typo>
            <div className='flex flex-col  p-6 font-medium items-center rounded-xl bg-gray-800'>
              <div className='w-full flex flex-row justify-between items-center'>
                <div className='flex flex-row gap-1.5'>
                  <Typo classes='text-base text-white'>segment 01</Typo>
                  {isLive && (
                    <WorkoutStatus status={WorkoutSessionStatus.RUNNING} />
                  )}
                </div>
                <Typo classes='text-gray-50 text-base'>
                  {getRowsValue(
                    workoutDataByConfigSlug?.impMetrics ?? [],
                    workoutSessionDetails?.segmentDurations[0],
                  )}
                </Typo>
              </div>
              <div className='h-[1px] bg-gray-500 w-full opacity-20 my-4' />
              <div className='w-full flex justify-center flex-col'>
                {workoutSessionDetails?.segmentDurations
                  ?.slice(1)
                  .map((segment, lapIdx) => {
                    const hasBottomBorder =
                      lapIdx <
                      workoutSessionDetails?.segmentDurations?.length - 1;
                    return (
                      <div
                        key={lapIdx}
                        className='flex flex-col justify-between items-center w-full'
                      >
                        <div className='flex flex-row justify-between items-center w-full'>
                          <Typo classes='text-base text-whit'>{`segment  ${lapIdx < 10 ? 0 : ''}${lapIdx + 1}`}</Typo>
                          <Typo classes='text-gray-50 text-base'>
                            {getRowsValue(
                              workoutDataByConfigSlug?.impMetrics ?? [],
                              segment,
                            )}
                          </Typo>
                        </div>
                        {hasBottomBorder && (
                          <div className='h-[1px] bg-gray-500 w-full opacity-20 my-3' />
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default MetricsCard;

const getRowsValue = (
  impMetrics: ImpMetrices[],
  segmentDurations: SegmentDuration,
) => {
  for (const metric of impMetrics) {
    const trimmedMetric = metric.trim();
    if (trimmedMetric === 'TimeForEachKMDistance') {
      return (segmentDurations?.pace / 1000)?.toFixed(3);
    } else if (trimmedMetric === 'TimeForEachMileDistance') {
      return (segmentDurations?.pace / 1609.34)?.toFixed(3);
    } else if (trimmedMetric === 'SegmentPace') {
      return segmentDurations.pace?.toFixed(3);
    } else if (trimmedMetric === 'SegmentTime') {
      return formatDuration(segmentDurations.elapsedDuration);
    }
  }

  return null;
};
