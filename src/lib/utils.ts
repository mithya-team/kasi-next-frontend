import clsx, { ClassValue } from 'clsx';
import dayjs from 'dayjs';
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

export const getHref = (id: string, status: WorkoutSessionStatus) => {
  switch (status) {
    case WorkoutSessionStatus.PAST:
      return `/workout/${id}/past`;
    case WorkoutSessionStatus.RUNNING:
      return `/workout/${id}/live`;
    case WorkoutSessionStatus.YET_TO_START:
      return `/workout/${id}/upcoming`;
    default:
      break;
  }
};
