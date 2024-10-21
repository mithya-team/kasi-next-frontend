import clsx, { ClassValue } from 'clsx';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/timezone';
import DayJSUtc from 'dayjs/plugin/utc';
dayjs.extend(duration);
dayjs.extend(DayJSUtc);
dayjs.extend(utc);
import { twMerge } from 'tailwind-merge';

import { AthleteSubscription } from '@/models/user/user.types';
import { WorkoutSessionStatus } from '@/models/workout/workout.types';

/** Merge classes with tailwind-merge with clsx full feature */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseDate = (date: string, format: string) => {
  const dateObj = dayjs(date);
  return dateObj.isValid() ? dateObj.format(format) : '-';
};

export const parseTime = (date: string): string => {
  const dateObj = dayjs(date);
  return dateObj.isValid() ? dateObj.format('hh:mm A') : '-';
};

export const parseTimeWithTimeZone = (date: string): string => {
  const dateObj = dayjs(date); // Create a dayjs object from the date string

  if (!dateObj.isValid()) {
    return '-'; // Return '-' for invalid dates
  }

  const browserTimezone = dayjs.tz.guess(); // Guess browser's timezone
  return dateObj.tz(browserTimezone).format('hh:mm A(Z)');
};
export const formatDuration = (seconds: number): string => {
  const formattedDuration = dayjs.duration(seconds, 'seconds');
  return formattedDuration.format('mm:ss');
};

export const getPlanStatusTag = (
  atheleteSubsCription?: AthleteSubscription,
) => {
  const { planId, subscription } = atheleteSubsCription ?? {};
  switch (planId) {
    case 'PAID_TIER_1_MONTH':
      return { status: 'Monthly Subscription', className: 'plan-status' };
    case 'PAID_TIER_12_MONTHS':
      return { status: 'Annual Subscription', className: 'plan-status' };
    case 'NONE':
      return subscription
        ? { status: 'Plan Expired', className: 'text-error-1' }
        : { status: 'Trial Expired', className: 'text-error-1' };
    default:
      return { status: 'Free Trial', className: 'text-green-500' };
  }
};

export const getHref = (
  id: string,
  status: WorkoutSessionStatus,
  userId: string,
) => {
  switch (status) {
    case WorkoutSessionStatus.PAST:
      return `user/${userId}/workout/${id}/past`;
    case WorkoutSessionStatus.Recovery:
      return `user/${userId}/workout/${id}/live`;
    case WorkoutSessionStatus.RUNNING:
      return `user/${userId}/workout/${id}/live`;
    case WorkoutSessionStatus.YET_TO_START:
      return `user/${userId}/workout/${id}/upcoming`;
    default:
      return '#';
  }
};

export const formatTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0');
  const mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
};
