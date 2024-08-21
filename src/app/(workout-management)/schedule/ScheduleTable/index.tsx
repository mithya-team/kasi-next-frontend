import Link from 'next/link';
import { FC } from 'react';

import { getHref, parseDate, parseTime } from '@/lib/utils';

import WorkoutStatus from '@/components/WorkoutStatus';

import { WorkoutScheduleData } from '@/models/workout/workout.types';

interface ScheduleTableProps {
  data: WorkoutScheduleData;
  onClick?: () => void;
  isSuperAdmin?: boolean;
}
const ScheduleTable: FC<ScheduleTableProps> = ({
  data,
  onClick,
  isSuperAdmin = false,
}) => {
  const { user } = data;
  return (
    <div className='flex border-b justify-center items-center border-gray-800 text-sm leading-[14px] text-white'>
      <div className='flex-1 p-5 text-ellipsis overflow-hidden'>
        <Link
          href={getHref(data?._id, data?.status, data?.userId) ?? '/'}
          onClick={onClick}
        >
          {user?.fullName}
        </Link>
      </div>
      {isSuperAdmin ? (
        <div className='flex-1 p-5 text-ellipsis overflow-hidden'>
          {data?.coachConnections?.coachDetails?.fullName ?? '-'}
        </div>
      ) : null}
      <div className='w-[20%] p-5'>
        <WorkoutStatus status={data?.status} />
      </div>
      <div className='flex-1 p-5 text-ellipsis overflow-hidden'>
        {data?.workoutConfig?.name ?? '-'}
      </div>
      <div className='w-[15%] p-5'>
        {parseDate(data?.startTime ?? '', 'MMMM D, YYYY')}
      </div>
      <div className='w-[15%] p-5'> {parseTime(data?.startTime ?? '')}</div>
    </div>
  );
};

export default ScheduleTable;
