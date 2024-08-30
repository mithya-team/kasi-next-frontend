import Link from 'next/link';
import { FC } from 'react';

import { toast } from '@/lib/toast';
import { getHref, parseDate, parseTime } from '@/lib/utils';

import WorkoutStatus from '@/components/WorkoutStatus';

import {
  WorkoutScheduleData,
  WorkoutSessionStatus,
} from '@/models/workout/workout.types';

interface ScheduleTableProps {
  data: WorkoutScheduleData;
  isSuperAdmin?: boolean;
}
const ScheduleTable: FC<ScheduleTableProps> = ({
  data,
  isSuperAdmin = false,
}) => {
  const { user, status } = data;
  const handleLinkClick = () => {
    if (status === WorkoutSessionStatus.CANCELLED) {
      toast.info('No info to display'); // Show the toast notification
    }
  };

  return (
    <Link
      href={
        status !== WorkoutSessionStatus.CANCELLED
          ? getHref(data?._id, status, data?.userId) ?? '/'
          : '#'
      }
      onClick={handleLinkClick}
      className='flex border-b justify-center items-center border-gray-800 text-sm leading-[14px] text-white'
    >
      <div className='flex-1 p-5 text-ellipsis text-base font-medium text-gray-400 overflow-hidden'>
        {user?.fullName}
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
    </Link>
  );
};

export default ScheduleTable;
