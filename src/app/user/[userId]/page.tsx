'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { FC, useMemo } from 'react';

import { cn, parseDate } from '@/lib/utils';

import Loader from '@/components/Loader';
import SvgIcon, { IconName } from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { useStoreState } from '@/store';

import { User } from '@/models/user/user.types';

const UserDetails = () => {
  const { usersList, isLoading } = useStoreState(
    ({ UsersListStore: { usersList, isLoading } }) => ({
      usersList,
      isLoading,
    }),
  );
  const { showUserWorkoutContent, userLoading, user } = useStoreState(
    ({
      UserStore: { showUserWorkoutContent, isLoading: userLoading, user },
    }) => ({
      showUserWorkoutContent,
      userLoading,
      user,
    }),
  );

  const pathname = usePathname();
  const userId = pathname.split('/')[2];

  return (
    <div className='flex flex-row'>
      <div className='w-[23%] h-[100vh] border-r border-gray-800'>
        {!isLoading ? (
          usersList?.map((user, index) => {
            return (
              <Link
                href={`/user/${user?._id}`}
                className={cn(
                  'p-5 block text-sm border-b border-gray-800  text-white leading-[14px] font-primary font-medium',
                  {
                    ['bg-gray-800']: user?._id === userId,
                  },
                )}
                key={index}
              >
                {user?.fullName}
              </Link>
            );
          })
        ) : (
          <Loader className='h-[100vh]' />
        )}
      </div>
      <div className='w-[45%] my-5 mx-auto flex flex-col gap-5 text-sm text-white font-primary font-medium leading-[14px]'>
        {!userLoading ? (
          showUserWorkoutContent ? (
            <WorkoutContent user={user} />
          ) : (
            <OverViewContent user={user} />
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default UserDetails;

interface OverviewContentProps {
  user: User | null;
}
const OverViewContent: FC<OverviewContentProps> = ({ user }) => {
  const overViewConfig = useMemo(() => getUserOverview(user), [user]);
  return (
    <>
      <div className='min-w-[45%] rounded-xl p-5 bg-gradient-to-r from-linear-3  to-linear-4'>
        {user?.userPreferences?.bestTimeResults.map((u, idx) => {
          return (
            <div
              className={cn(
                'flex flex-row justify-between p-5 border-b border-gray-800 last:border-0 ',
              )}
              key={idx}
            >
              <span>{u.paceType}</span>
              <span>{`${u.minPace} - ${u?.maxPace}`}</span>
            </div>
          );
        })}
      </div>
      {overViewConfig?.map((config, idx) => {
        return (
          <div
            className='py-3 px-5 flex flex-row rounded-xl bg-gray-800 justify-between'
            key={idx}
          >
            <div className='flex flex-row justify-center items-center gap-2.5'>
              <SvgIcon name={config.iconName} />
              <Typo level='h6'>{config.label}</Typo>
            </div>
            <Typo level='h6' classes='text-gray-50'>
              {config.value}
            </Typo>
          </div>
        );
      })}
    </>
  );
};

interface WorkoutContentProps {
  user: User | null;
}
const WorkoutContent: FC<WorkoutContentProps> = () => {
  return <>Workout content</>;
};

interface IConfig {
  iconName: IconName;
  label: string;
  value: string | number;
}

const getUserOverview = (user: User | null): IConfig[] => {
  return [
    {
      iconName: 'user',
      label: 'Name',
      value: user?.fullName ?? '-',
    },
    {
      iconName: 'dob',
      label: 'Date of birth',
      value:
        parseDate(user?.userPreferences?.dateOfBirth ?? '', 'MMMM D, YYYY') ??
        '-',
    },
    {
      iconName: 'distance',
      label: 'Distance unit',
      value: user?.userPreferences?.distanceUnit ?? '-',
    },
    {
      iconName: 'voice',
      label: 'Voice',
      value: user?.userPreferences?.voiceType ?? '-',
    },
    {
      iconName: 'heart-rate',
      label: 'Max Heart Rate',
      value: user?.userPreferences?.maxHeartRate ?? '-',
    },
    {
      iconName: 'clock',
      label: 'Best Time',
      value: user?.userPreferences?.bestTime?.completionPace ?? '-',
    },

    {
      iconName: 'subscription',
      label: 'Subscription',
      value: '-',
    },
  ];
};
