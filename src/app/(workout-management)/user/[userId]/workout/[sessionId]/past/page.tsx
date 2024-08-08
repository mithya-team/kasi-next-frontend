'use client';
import { FC } from 'react';

import { useStoreState } from '@/store';

import { MetricLayoutView } from '@/features/MetricLayouts/MetricLayoutView';
import withAuth from '@/hoc/withAuth';
import {
  getMetricLayouts,
  initializeMetrics,
  updateMetricPrettified,
} from '@/models/workout/workout-metric/workout-metric.adapter';

const PastScreen: FC = () => {
  const { workoutSessionDetails, workoutDataByConfigSlug } = useStoreState(
    ({ WorkoutStore: { workoutSessionDetails, workoutDataByConfigSlug } }) => ({
      workoutSessionDetails,
      workoutDataByConfigSlug,
    }),
  );

  // Call first time
  const metricPrettified = initializeMetrics(
    workoutDataByConfigSlug?.impMetrics,
    workoutSessionDetails?.lengthUnit,
  );

  // Invoke these two when data is updated
  const updatedMetricPrettified = updateMetricPrettified(
    workoutSessionDetails,
    metricPrettified,
  );

  // Get metric layouts
  const metricLayout = getMetricLayouts(
    workoutDataByConfigSlug,
    workoutSessionDetails,
    updatedMetricPrettified,
  );
  return (
    <div className='text-white mt-[60px] items-center justify-center'>
      {metricLayout.length && (
        <MetricLayoutView metricLayout={metricLayout[0]} />
      )}
    </div>
  );
};

export default withAuth(PastScreen);
