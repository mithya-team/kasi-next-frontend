'use client';
import { isAxiosError } from 'axios';
import Image from 'next/image';
import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import { toast } from '@/lib/toast';

import Button from '@/components/Buttons';
import EmptyUserWorkout from '@/components/EmptyUserWorkout';
import Loader from '@/components/Loader';
import Typo from '@/components/typography/Typo';

import { useStoreActions, useStoreState } from '@/store';

import ScheduleTable from '@/app/(workout-management)/schedule/ScheduleTable';
import HeaderFilter, { IConfig } from '@/features/HeaderFilter';
import withAuth from '@/hoc/withAuth';
import { WorkoutSessionStatus } from '@/models/workout/workout.types';

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

  const {
    fetchWorkoutScheduleData,
    updateScheduleScreenSort,
    updateScheduleFilters,
  } = useStoreActions(
    ({
      WorkoutStore: { fetchWorkoutScheduleData },
      filterStore: { updateScheduleScreenSort, updateScheduleFilters },
    }) => ({
      fetchWorkoutScheduleData,
      updateScheduleScreenSort,
      updateScheduleFilters,
    }),
  );

  const handleCheckboxChange = async (config: IConfig) => {
    const isSelected = scheduleFilters.includes(
      config.id as WorkoutSessionStatus,
    );

    const newSelectedItems = isSelected
      ? scheduleFilters.filter((id) => id !== config.id)
      : [...scheduleFilters, config.id];
    try {
      updateScheduleFilters(newSelectedItems as WorkoutSessionStatus[]);
      await fetchWorkoutScheduleData({
        status: newSelectedItems as WorkoutSessionStatus[],
        sort: `${scheduleScreenSort === 'asc' ? '+' : '-'}createdAt`,
        page: 1,
      });
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  };

  return (
    <div
      id='schedule-scrollable-div'
      className='w-full px-5 font-medium font-primary overflow-y-scroll h-full'
    >
      <div className='flex sticky top-0 bg-gray-800 text-base  text-gray-400 mb-5'>
        <div className='flex-1 py-3 pl-5'>Runner</div>
        {isSuperAdmin ? <div className='flex-1 py-3 pl-5'>Coach</div> : null}
        <div className='w-[20%] flex flex-row justify-between py-3 px-5'>
          <Typo>Workout Status</Typo>
          <HeaderFilter handleCheckboxChange={handleCheckboxChange} />
        </div>
        <div className='flex-1 py-3 pl-5'>Workout Name</div>
        <div className='w-[15%] flex flex-row justify-between py-3 px-5'>
          <Typo>Date</Typo>
          <Button
            onClick={() => {
              fetchWorkoutScheduleData({
                page: 1,
                sort: `${scheduleScreenSort === 'asc' ? '-' : '+'}createdAt`,
                status: scheduleFilters,
              });
              updateScheduleScreenSort(
                scheduleScreenSort === 'asc' ? 'desc' : 'asc',
              );
              setCurrentPage(1);
            }}
            className='mr-5 transform transition-transform'
          >
            <Image
              src={
                scheduleScreenSort === 'desc'
                  ? '/images/desc.png'
                  : '/images/asc.png'
              }
              alt='sort-icon'
              width={16}
              height={16}
            />
          </Button>
        </div>
        <div className='w-[15%] py-3 pl-5'>Time</div>
      </div>
      {workoutScheduleData?.length ? (
        <InfiniteScroll
          next={() => {
            fetchWorkoutScheduleData({
              page: currentPage + 1,
              sort: `${scheduleScreenSort === 'asc' ? '+' : '-'}createdAt`,
              status: scheduleFilters,
            });
            setCurrentPage((prevPage) => prevPage + 1);
          }}
          hasMore={hasMore}
          loader={<Loader />}
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
      ) : isWorkoutScheduleLoading ? (
        <Loader />
      ) : (
        <EmptyUserWorkout
          helperText='No run scheduled any run by runner yet.'
          className='gap-9 mt-4'
        />
      )}
    </div>
  );
};

export default withAuth(Schedule);
