'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';

import { getHref, parseDate, parseTime } from '@/lib/utils';

import StartCallButton from '@/components/Buttons/StartCallButton';
import Loader from '@/components/Loader';
import SvgIcon from '@/components/SvgIcon';
import WorkoutStatus from '@/components/WorkoutStatus';

import { useStoreActions, useStoreState } from '@/store';

import withAuth from '@/hoc/withAuth';

const Schedule = () => {
  const { workoutScheduleData, isWorkoutScheduleLoading } = useStoreState(
    ({ WorkoutStore: { workoutScheduleData, isWorkoutScheduleLoading } }) => ({
      workoutScheduleData,
      isWorkoutScheduleLoading,
    }),
  );

  const { fetchWorkoutScheduleData, fetchUser, fetchUserWorkoutData } =
    useStoreActions(
      ({
        WorkoutStore: { fetchWorkoutScheduleData, fetchUserWorkoutData },
        UserStore: { fetchUser },
      }) => ({
        fetchWorkoutScheduleData,
        fetchUser,
        fetchUserWorkoutData,
      }),
    );

  useEffect(() => {
    fetchWorkoutScheduleData({});
  }, []);

  if (isWorkoutScheduleLoading) return <Loader />;

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
        const { user } = data;
        return (
          <div
            key={index}
            className='flex border-b border-gray-800 text-sm leading-[14px] text-white'
          >
            <div className='w-[19%] p-5 text-ellipsis overflow-hidden'>
              <Link
                href={getHref(data?._id, data?.status) ?? '/'}
                onClick={() => {
                  if (user) {
                    fetchUser(user?._id);
                    fetchUserWorkoutData({ userId: user?._id });
                  }
                }}
              >
                {user?.fullName}
              </Link>
            </div>
            <div className='w-[15%] px-5 py-[15px]'>
              <WorkoutStatus status={data?.status} />
            </div>
            <div className='w-[19%] p-5 text-ellipsis overflow-hidden'>
              {data?.workoutConfig?.name ?? '-'}
            </div>
            <div className='w-[10%] p-5'>
              {parseDate(user?.createdAt ?? '', 'MMMM D, YYYY')}
            </div>
            <div className='w-[10%] p-5'>
              {' '}
              {parseTime(user?.createdAt ?? '')}
            </div>
            <div className='w-[19%] px-5 py-2.5'>
              <StartCallButton>Start call</StartCallButton>
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
