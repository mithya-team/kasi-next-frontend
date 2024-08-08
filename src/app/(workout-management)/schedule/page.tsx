'use client';
import React, { useEffect } from 'react';

import EmptyUserWorkout from '@/components/EmptyUserWorkout';
import Loader from '@/components/Loader';

import { useStoreActions, useStoreState } from '@/store';

import ScheduleTable from '@/app/(workout-management)/schedule/ScheduleTable';
import withAuth from '@/hoc/withAuth';

const Schedule = () => {
  const { workoutScheduleData, isWorkoutScheduleLoading } = useStoreState(
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

  if (isWorkoutScheduleLoading) return <Loader />;

  return (
    <div className='w-full px-5 font-medium font-primary overflow-auto'>
      <div className='flex bg-gray-800 text-base  text-gray-400 mb-5'>
        <div className='flex-1 py-3 pl-5'>Username</div>
        <div className='w-[20%] py-3 pl-5'>Workout</div>
        <div className='flex-1 py-3 pl-5'>Workout Name</div>
        <div className='w-[15%] py-3 pl-5'>Date</div>
        <div className='w-[15%] py-3 pl-5'>Time</div>
      </div>
      {!workoutScheduleData?.length ? (
        <EmptyUserWorkout
          helperText='No run scheduled any run by runner yet.'
          className='gap-9 mt-4'
        />
      ) : (
        workoutScheduleData?.map((data) => {
          return <ScheduleTable data={data} key={data?._id} />;
        })
      )}
    </div>
  );
};

export default withAuth(Schedule);
