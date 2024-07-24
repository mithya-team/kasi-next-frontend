import Link from 'next/link';
import { FC } from 'react';

import { getHref, parseDate, parseTime } from '@/lib/utils';

import StartCallButton from '@/components/Buttons/StartCallButton';
import SvgIcon from '@/components/SvgIcon';
import WorkoutStatus from '@/components/WorkoutStatus';

import { WorkoutScheduleData } from '@/models/workout/workout.types';

interface ScheduleTableProps {
  data: WorkoutScheduleData;
  onClick?: () => void;
}
const ScheduleTable: FC<ScheduleTableProps> = ({ data, onClick }) => {
  const { user } = data;
  return (
    <div className='flex border-b border-gray-800 text-sm leading-[14px] text-white'>
      <div className='w-[19%] p-5 text-ellipsis overflow-hidden'>
        <Link href={getHref(data?._id, data?.status) ?? '/'} onClick={onClick}>
          {user?.fullName}
        </Link>
      </div>
      <div className='w-[15%] px-5 py-[15px]'>
        <WorkoutStatus status={data?.status} />
      </div>
      <div className='w-[19%] p-5 text-ellipsis overflow-hidden'>
        {data?.workoutConfig?.name ?? '-'}
      </div>
      <div className='w-[12%] p-5'>
        {parseDate(user?.createdAt ?? '', 'MMMM D, YYYY')}
      </div>
      <div className='w-[10%] p-5'> {parseTime(user?.createdAt ?? '')}</div>
      <div className='w-[19%] px-5 py-2.5'>
        <StartCallButton>Start call</StartCallButton>
      </div>
      <button className='w-[5.00%] p-5'>
        <SvgIcon name='three-dots' />
      </button>
    </div>
  );
};

export default ScheduleTable;
