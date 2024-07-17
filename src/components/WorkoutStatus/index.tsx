import { FC } from 'react';

import { cn } from '@/lib/utils';

import { WorkoutSessionStatus } from '@/models/workout/workout.types';

export interface WorkoutStatusProps {
  status: WorkoutSessionStatus;
}

const WorkoutStatus: FC<WorkoutStatusProps> = ({ status }) => {
  const renderStatusText = (status: WorkoutSessionStatus) => {
    switch (status) {
      case WorkoutSessionStatus.RUNNING || WorkoutSessionStatus.Recovery:
        return 'Live';
      case WorkoutSessionStatus.YET_TO_START:
        return 'Upcoming';
      case WorkoutSessionStatus.PAST:
        return 'Past';
      default:
        return 'Upcoming';
    }
  };

  return (
    <div
      className={cn(
        'flex justify-center items-center  flex-row gap-1.5 py-0.5 px-2.5 rounded-md text-white text-sm font-primary bg-gray-700 font-semibold',
        {
          ['bg-violet-700']: status === WorkoutSessionStatus.RUNNING,
        },
      )}
    >
      {status === WorkoutSessionStatus.RUNNING ? (
        <div className='w-2 h-2 bg-white rounded-full' />
      ) : null}
      {renderStatusText(status)}
    </div>
  );
};

export default WorkoutStatus;
