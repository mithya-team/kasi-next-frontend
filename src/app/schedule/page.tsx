'use client';
import React, { useEffect } from 'react';

import EmptyUserWorkout from '@/components/EmptyUserWorkout';
import Loader from '@/components/Loader';

import { useStoreActions, useStoreState } from '@/store';

import ScheduleTable from '@/app/schedule/ScheduleTable';
import withAuth from '@/hoc/withAuth';

const Schedule = () => {
  const { workoutScheduleData, isWorkoutScheduleLoading } = useStoreState(
    ({ WorkoutStore: { workoutScheduleData, isWorkoutScheduleLoading } }) => ({
      workoutScheduleData,
      isWorkoutScheduleLoading,
    }),
  );

  const { fetchWorkoutScheduleData, setUser } = useStoreActions(
    ({
      WorkoutStore: { fetchWorkoutScheduleData },
      UserStore: { setUser },
    }) => ({
      fetchWorkoutScheduleData,
      setUser,
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
        <div className='w-[12%] py-3 pl-5'>Date</div>
        <div className='w-[10%] py-3 pl-5'>Time</div>
        <div className='w-[19%] py-3 pl-5'>Call</div>
        <div className='w-[5%] py-3 pl-5'></div>
      </div>
      {!workoutScheduleData?.length ? (
        <EmptyUserWorkout
          helperText='No run scheduled any run by runner yet.'
          className='gap-9 mt-4'
        />
      ) : (
        workoutScheduleData?.map((data) => {
          const { user } = data;
          return (
            <ScheduleTable
              data={data}
              key={data?._id}
              onClick={() => {
                if (user) setUser(user);
              }}
            />
          );
        })
      )}
    </div>
  );
};

export default withAuth(Schedule);
