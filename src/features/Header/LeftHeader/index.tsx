'use client';
import { debounce } from 'lodash';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import SvgIcon from '@/components/SvgIcon';
import TextInput from '@/components/TextInput';

import { useStoreState } from '@/store';

import WorkoutLeftHeader from '@/features/Header/WorkoutLeftHeader';
import { WorkoutSessionStatus } from '@/models/workout/workout.types';

export interface LeftHeaderProps {
  leftHeaderClass?: string;
  onSearch?: (searchTerm: string) => void;
}
const LeftHeader: FC<LeftHeaderProps> = ({ leftHeaderClass, onSearch }) => {
  const pathname = usePathname();
  const sessionId = pathname.split('/')[4];

  const { user, userWorkoutData, isWorkoutDetailPage } = useStoreState(
    ({
      UserStore: { user },
      WorkoutStore: { userWorkoutData, isWorkoutDetailPage },
    }) => ({
      user,
      userWorkoutData,
      isWorkoutDetailPage,
    }),
  );

  const workoutData = useMemo(() => {
    return userWorkoutData?.find((workout) => workout?._id === sessionId);
  }, [userWorkoutData, user, pathname]);

  return (
    <div
      className={cn(
        'left-header flex flex-row justify-center py-2 items-center gap-5',
        leftHeaderClass,
      )}
    >
      {isWorkoutDetailPage ? (
        <WorkoutLeftHeader
          userName={user?.fullName ?? ''}
          startTime={workoutData?.startTime ?? ''}
          status={workoutData?.status ?? WorkoutSessionStatus?.YET_TO_START}
          workoutName={workoutData?.workoutConfig?.name ?? ''}
        />
      ) : (
        <SearchView onSearch={onSearch} />
      )}
    </div>
  );
};

export default LeftHeader;

const SearchView: FC<LeftHeaderProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounced function to delay API call
  const debouncedFetchUsers = debounce((term: string) => {
    onSearch?.(term);
  }, 500); // Adjust debounce delay as needed

  useEffect(() => {
    debouncedFetchUsers(searchTerm);
    return () => {
      debouncedFetchUsers.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <>
      <div className='px-5 py-2 border-[1px] h-[54px] items-center justify-center flex border-gray-600 rounded-xl'>
        <TextInput
          startAdornment={<SvgIcon name='search' />}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search'
          classNames={{
            inputRoot: 'border-none border-0 p-0 gap-3',
            container: 'border-0 p-0',
            input:
              'border-0 border-none placeholder:text-gray-300 text-white h-3.5 font-medium text-sm font-primary leading-[14px]',
          }}
          className='gap-0'
        />
      </div>
      <div className='px-[15px] w-[54px] flex justify-center items-center h-[54px] py-[18px] border-[1px] border-gray-600 rounded-xl'>
        <SvgIcon name='sort' />
      </div>
    </>
  );
};
