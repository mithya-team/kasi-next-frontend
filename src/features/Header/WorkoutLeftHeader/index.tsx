import { FC } from 'react';

import { parseDate } from '@/lib/utils';

import Typo from '@/components/typography/Typo';
import WorkoutStatus from '@/components/WorkoutStatus';

import { WorkoutSessionStatus } from '@/models/workout/workout.types';

interface WorkoutLeftHeaderProps {
  userName: string;
  workoutName: string;
  status: WorkoutSessionStatus;
  startTime: string;
}
const workoutLeftHeader: FC<WorkoutLeftHeaderProps> = ({
  workoutName,
  status,
  startTime,
  userName,
}) => {
  return (
    <div className='flex py-2.5 px-5 font-primary font-medium text-base text-gray-400'>
      <div className='flex flex-row gap-3 justify-center items-center'>
        <WorkoutStatus status={status} />
        <div className='flex flex-row gap-5 justify-center items-center'>
          <Typo classes='text-xl font-secondary font-semibold text-gray-50'>
            {userName}
          </Typo>
          <Typo classes='text-sm font-primary'>
            {parseDate(startTime, 'D MMMM, h:mm a')}
          </Typo>
          <Typo classes='text-sm font-primary'>{workoutName}</Typo>
        </div>
      </div>
    </div>
  );
};

export default workoutLeftHeader;
