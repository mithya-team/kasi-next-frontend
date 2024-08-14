import dayjs from 'dayjs';

import { ProductPlanId } from '@/models/user/user.types';
import {
  LengthUnit,
  WorkoutSessionStatus,
} from '@/models/workout/workout.types';

export function convertDistance(lengthUnit: LengthUnit, totalDistance: number) {
  if (lengthUnit === LengthUnit.KM) {
    // Convert kilometers to meters
    return (totalDistance * 1000).toFixed(2);
  } else if (lengthUnit === LengthUnit.MILES) {
    // Return miles as is
    return totalDistance;
  } else {
    throw new Error('Invalid length unit');
  }
}

export const formatTime = (date: dayjs.Dayjs) => {
  const now = dayjs();
  const days = date.diff(now, 'day');
  const hours = date.diff(now, 'hour') % 24;
  const minutes = date.diff(now, 'minute') % 60;
  const seconds = date.diff(now, 'second') % 60;

  return { days, hours, minutes, seconds };
};

export const isProductPlanId = (id: string): id is ProductPlanId =>
  [
    'FREE_TIER',
    'NONE',
    'PAID_TIER_1_MONTH',
    'PAID_TIER_6_MONTHS',
    'PAID_TIER_12_MONTHS',
  ].includes(id);

export const isWorkoutSessionStatus = (
  id: string,
): id is WorkoutSessionStatus =>
  ['RUNNING', 'YET_TO_START', 'RECOVERY', 'PAST'].includes(id);
