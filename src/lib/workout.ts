import dayjs from 'dayjs';

import { LengthUnit } from '@/models/workout/workout.types';

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
