import Link from 'next/link';
import { FC } from 'react';

import { cn, getHref, parseDate } from '@/lib/utils';

import EmptyUserWorkout from '@/components/EmptyUserWorkout';
import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';
import WorkoutStatus from '@/components/WorkoutStatus';

import {
  UserWorkoutData,
  WorkoutSessionStatus,
} from '@/models/workout/workout.types';

interface WorkoutContentProps {
  userWorkoutData: UserWorkoutData[] | null;
}

const WorkoutContent: FC<WorkoutContentProps> = ({ userWorkoutData }) => {
  if (!userWorkoutData?.length)
    return <EmptyUserWorkout helperText='You have no upcoming runs' />;

  return (
    <>
      {userWorkoutData?.map((data, index) => {
        const { startTime, status, workoutConfig } = data;
        return (
          <Link
            href={getHref(data?._id, status) ?? '/'}
            key={index}
            className={cn(
              'flex w-full flex-row justify-between items-center rounded-xl py-[15px] px-5',
              {
                ['bg-gray-800']: status === WorkoutSessionStatus.PAST,
                ['bg-green-900']: status === WorkoutSessionStatus.RUNNING,
                ['bg-gray-600']: status === WorkoutSessionStatus.YET_TO_START,
              },
            )}
          >
            <div className='flex flex-row gap-5'>
              <WorkoutStatus status={status} />
              <Typo classes='text-sm font-primary'>
                {parseDate(startTime, 'D MMMM. h:mm a')}
              </Typo>
              <Typo classes='text-sm font-primary'>{workoutConfig?.name}</Typo>
            </div>
            <SvgIcon name='right-arrow' />
          </Link>
        );
      })}
    </>
  );
};

export default WorkoutContent;
