'use client';
import { FC, useMemo } from 'react';

import { convertDistance } from '@/lib/workout';

import SvgIcon, { IconName } from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { useStoreState } from '@/store';

import {
  LengthUnit,
  WorkoutConfigDetails,
  WorkoutSessionDetails,
} from '@/models/workout/workout.types';

const WorkoutConfigHeader: FC = () => {
  const { workoutSessionDetails, workoutDataByConfigSlug } = useStoreState(
    ({ WorkoutStore: { workoutSessionDetails, workoutDataByConfigSlug } }) => ({
      workoutSessionDetails,
      workoutDataByConfigSlug,
    }),
  );

  const workoutConfig = useMemo(() => {
    if (!workoutSessionDetails) return [];
    return getWorkoutConfig(workoutSessionDetails, workoutDataByConfigSlug);
  }, [workoutSessionDetails]);

  return (
    <div className='flex flex-row justify-between items-center gap-x-2.5'>
      {workoutConfig?.map((config, idx) => {
        const isRightmost = idx < workoutConfig.length - 1;
        return (
          <div
            className='flex flex-row items-center justify-center border-r border-gray-600'
            key={idx}
            style={{
              borderRight: !isRightmost
                ? 'none'
                : '1px solid rgba(75, 85, 99, 0.2)',
            }}
          >
            <div className='flex flex-col px-[30px] py-4 items-center'>
              <SvgIcon name={config?.icon} pathFill='#91E0C8' />
              <Typo level='h2' classes='font-secondary text-green-500'>
                {config?.value}
              </Typo>
              <Typo classes='font-primary text-sm text-gray-200 uppercase '>
                {config?.label}
              </Typo>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutConfigHeader;

interface Config {
  icon: IconName;
  label: string;
  value: string | number;
}

const getWorkoutConfig = (
  workoutData: WorkoutSessionDetails,
  workoutDataByConfigSlug: WorkoutConfigDetails | null,
): Config[] => {
  const initialMetrics: Config[] = [];

  for (const metric of workoutDataByConfigSlug?.impMetrics ?? []) {
    switch (metric) {
      case 'TotalDistance':
        initialMetrics.push({
          label: 'Total Distance',
          value: convertDistance(
            workoutData?.lengthUnit ?? LengthUnit?.KM,
            workoutData?.totalDistance ?? 0,
          ),
          icon: 'elapsed-distance',
        });
        break;
      case 'TimeElapsed':
        initialMetrics.push({
          label: 'Time',
          value: workoutData?.timeElapsed ?? '00:00',
          icon: 'elapsed-time',
        });
        break;
      case 'Pace':
        initialMetrics.push({
          label: 'Pace',
          value: workoutData?.workoutData?.[0].averagePace,
          icon: 'pace',
        });
        break;
      case 'HeartRate':
        if (workoutData?.workoutData?.length) {
          let totalHeartRate = 0;
          let lapCount = 0;
          for (const rep of workoutData.workoutData) {
            for (const lap of rep.reps) {
              if (lap) {
                totalHeartRate += lap?.laps?.[0]?.averageHeartRate;
                lapCount++;
              }
            }
          }
          const averageHeartRate = lapCount > 0 ? totalHeartRate / lapCount : 0;
          initialMetrics.push({
            label: 'Heart Rate',
            value: averageHeartRate ?? '00',
            icon: 'heart-rate',
          });
        }
        break;
      default:
        break;
    }
  }
  return initialMetrics;
};
