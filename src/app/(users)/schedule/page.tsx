'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';

import { getPlanStatusTag, parseDate } from '@/lib/utils';

import SvgIcon from '@/components/SvgIcon';

import { useStoreActions, useStoreState } from '@/store';

import withAuth from '@/hoc/withAuth';

const Schedule = () => {
  const { workoutScheduleData } = useStoreState(
    ({ WorkoutStore: { workoutScheduleData, isWorkoutScheduleLoading } }) => ({
      workoutScheduleData,
      isWorkoutScheduleLoading,
    }),
  );

  const { fetchWorkoutScheduleData } = useStoreActions(
    ({ WorkoutStore: { fetchWorkoutScheduleData } }) => ({
      fetchWorkoutScheduleData,
    }),
  );

  useEffect(() => {
    fetchWorkoutScheduleData({});
  }, []);

  return (
    <div className='w-full px-5 font-medium font-primary overflow-auto'>
      <div className='flex bg-gray-800 text-base  text-gray-400 mb-5'>
        <div className='w-[19%] py-3 pl-5'>Username</div>
        <div className='w-[15%] py-3 pl-5'>Workout</div>
        <div className='w-[19%] py-3 pl-5'>Workout Name</div>
        <div className='w-[10%] py-3 pl-5'>Date</div>
        <div className='w-[10%] py-3 pl-5'>Time</div>
        <div className='w-[19%] py-3 pl-5'>Call</div>
        <div className='w-[5%] py-3 pl-5'></div>
      </div>
      {workoutScheduleData?.map((data, index) => {
        const { status, className } = getPlanStatusTag(
          data?.user?.athleteSubscription?.[0],
        );
        const { user } = data;
        return (
          <div
            key={index}
            className='flex border-b border-gray-800 text-sm leading-[14px] text-white'
          >
            <div className='w-[21.62%] p-5 text-ellipsis overflow-hidden'>
              <Link href={`/user/${encodeURIComponent(user?._id ?? '')}`}>
                {user?.fullName}
              </Link>
            </div>
            <div className='w-[10.29%] p-5'>
              {parseDate(user?.createdAt ?? '', 'MMMM D, YYYY')}
            </div>
            <div className={`w-[16.91%] p-5 ${className}`}>{status}</div>
            <div className='w-[21.62%] p-5 text-ellipsis overflow-hidden'>
              {user?.email}
            </div>
            <div className='w-[21.62%] p-5 text-gray-500'>
              Member already exists
            </div>
            <button className='w-[5.00%] p-5'>
              <SvgIcon name='three-dots' />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default withAuth(Schedule);
