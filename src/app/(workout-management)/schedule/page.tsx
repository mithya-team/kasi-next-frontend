'use client';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { isWorkoutSessionStatus } from '@/lib/workout';

import Button from '@/components/Buttons';
import EmptyUserWorkout from '@/components/EmptyUserWorkout';
import Loader from '@/components/Loader';
import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { useStoreActions, useStoreState } from '@/store';

import ScheduleTable from '@/app/(workout-management)/schedule/ScheduleTable';
import withAuth from '@/hoc/withAuth';
import { WorkoutSessionStatus } from '@/models/workout/workout.types';

const Schedule = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const {
    workoutScheduleData,
    isWorkoutScheduleLoading,
    hasMore,
    selectedFilters,
  } = useStoreState(
    ({
      WorkoutStore: { workoutScheduleData, isWorkoutScheduleLoading, hasMore },
      filterStore: { selectedFilters },
    }) => ({
      workoutScheduleData,
      isWorkoutScheduleLoading,
      hasMore,
      selectedFilters,
    }),
  );

  const { fetchWorkoutScheduleData, updateSelectedFilter } = useStoreActions(
    ({
      WorkoutStore: { fetchWorkoutScheduleData },
      filterStore: { updateSelectedFilter },
    }) => ({
      fetchWorkoutScheduleData,
      updateSelectedFilter,
    }),
  );
  const handleSortClick = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
    setCurrentPage(1); // Reset to the first page when sorting
  };

  useEffect(() => {
    const filteredStatus =
      selectedFilters.length > 0 &&
      selectedFilters.every(isWorkoutSessionStatus)
        ? (selectedFilters as WorkoutSessionStatus[])
        : [];
    fetchWorkoutScheduleData({
      page: currentPage,
      sort: `${sortOrder === 'asc' ? '+' : '-'}createdAt`,
      status: filteredStatus,
    });
    return () => {
      updateSelectedFilter([]);
    };
  }, [currentPage, sortOrder]);

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
        <div className='w-[15%] flex flex-row justify-between py-3 pl-5'>
          <Typo>Joined</Typo>
          <Button
            onClick={handleSortClick}
            className={`mr-14 transform transition-transform ${
              sortOrder === 'desc' ? '' : 'rotate-180'
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
            return <ScheduleTable data={data} key={idx} />;
          })}
        </InfiniteScroll>
      )}
    </div>
  );
};

export default withAuth(Schedule);
