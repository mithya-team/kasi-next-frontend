'use client';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import EmptyUserWorkout from '@/components/EmptyUserWorkout';
import Loader from '@/components/Loader';

import { useStoreActions, useStoreState } from '@/store';

import ScheduleTable from '@/app/(workout-management)/schedule/ScheduleTable';
import withAuth from '@/hoc/withAuth';

const Schedule = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { workoutScheduleData, isWorkoutScheduleLoading, hasMore } =
    useStoreState(
      ({
        WorkoutStore: {
          workoutScheduleData,
          isWorkoutScheduleLoading,
          hasMore,
        },
      }) => ({
        workoutScheduleData,
        isWorkoutScheduleLoading,
        hasMore,
      }),
    );

  const { fetchWorkoutScheduleData } = useStoreActions(
    ({ WorkoutStore: { fetchWorkoutScheduleData } }) => ({
      fetchWorkoutScheduleData,
    }),
  );

  useEffect(() => {
    fetchWorkoutScheduleData({ page: currentPage });
  }, [currentPage]);

  if (isWorkoutScheduleLoading && !workoutScheduleData?.length)
    return <Loader />;

  return (
    <div
      id='schedule-scrollable-div'
      className='w-full px-5 font-medium font-primary overflow-y-scroll h-full'
    >
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
        <InfiniteScroll
          next={() => setCurrentPage((prevPage) => prevPage + 1)}
          hasMore={hasMore}
          loader={undefined}
          dataLength={workoutScheduleData?.length ?? 0}
          scrollableTarget='schedule-scrollable-div'
          scrollThreshold={0.5}
        >
          {workoutScheduleData?.map((data, idx) => {
            return <ScheduleTable data={data} key={idx} />;
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default withAuth(Schedule);
