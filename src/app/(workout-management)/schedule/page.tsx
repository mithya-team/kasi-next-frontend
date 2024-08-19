'use client';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Button from '@/components/Buttons';
import EmptyUserWorkout from '@/components/EmptyUserWorkout';
import Loader from '@/components/Loader';
import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { useStoreActions, useStoreState } from '@/store';

import ScheduleTable from '@/app/(workout-management)/schedule/ScheduleTable';
import withAuth from '@/hoc/withAuth';

const Schedule = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    workoutScheduleData,
    isWorkoutScheduleLoading,
    hasMore,
    scheduleFilters,
    scheduleScreenSort,
    isSuperAdmin,
  } = useStoreState(
    ({
      WorkoutStore: { workoutScheduleData, isWorkoutScheduleLoading, hasMore },
      filterStore: { scheduleFilters, scheduleScreenSort },
      AdminStore: { isSuperAdmin },
    }) => ({
      workoutScheduleData,
      isWorkoutScheduleLoading,
      hasMore,
      scheduleFilters,
      scheduleScreenSort,
      isSuperAdmin,
    }),
  );

  const { fetchWorkoutScheduleData, updateScheduleScreenSort } =
    useStoreActions(
      ({
        WorkoutStore: { fetchWorkoutScheduleData },
        filterStore: { updateScheduleScreenSort },
      }) => ({
        fetchWorkoutScheduleData,
        updateScheduleScreenSort,
      }),
    );
  const handleSortClick = () => {
    updateScheduleScreenSort(scheduleScreenSort === 'asc' ? 'desc' : 'asc');
    setCurrentPage(1); // Reset to the first page when sorting
  };

  useEffect(() => {
    fetchWorkoutScheduleData({
      page: currentPage,
      sort: `${scheduleScreenSort === 'asc' ? '+' : '-'}createdAt`,
      status: scheduleFilters,
    });
  }, [currentPage, scheduleScreenSort]);

  if (isWorkoutScheduleLoading && !workoutScheduleData?.length)
    return <Loader />;

  return (
    <div
      id='schedule-scrollable-div'
      className='w-full px-5 font-medium font-primary overflow-y-scroll h-full'
    >
      <div className='flex bg-gray-800 text-base  text-gray-400 mb-5'>
        <div className='flex-1 py-3 pl-5'>Username</div>
        {isSuperAdmin ? <div className='flex-1 py-3 pl-5'>Coach</div> : null}
        <div className='w-[20%] py-3 pl-5'>Workout Status</div>
        <div className='flex-1 py-3 pl-5'>Workout Name</div>
        <div className='w-[15%] flex flex-row justify-between py-3 pl-5'>
          <Typo>Start Date</Typo>
          <Button
            onClick={handleSortClick}
            className={`mr-14 transform transition-transform ${
              scheduleScreenSort === 'desc' ? '' : 'rotate-180'
            }`}
          >
            <SvgIcon pathFill='#9CA3AF' name='down-arrow' />
          </Button>
        </div>
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
            return (
              <ScheduleTable
                data={data}
                key={idx}
                isSuperAdmin={isSuperAdmin}
              />
            );
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default withAuth(Schedule);
