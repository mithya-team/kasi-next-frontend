'use client';
import React, { FC, useMemo } from 'react';

import { cn, getPlanStatusTag, parseDate } from '@/lib/utils';

import SvgIcon, { IconName } from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { User } from '@/models/user/user.types';

interface OverviewContentProps {
  user: User | null;
}
const OverViewContent: FC<OverviewContentProps> = ({ user }) => {
  const overViewConfig = useMemo(() => getUserOverview(user), [user]);
  return (
    <>
      {user?.userPreferences ? (
        <div className='min-w-[45%] user-overview relative'>
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
          <SvgIcon
            name='overview-image'
            className='absolute right-0 bottom-0'
          />
        </div>
      ) : null}

      {overViewConfig?.map((config, idx) => {
        return (
          <div
            className='py-3 px-5 flex flex-row rounded-xl bg-gray-800 justify-between items-center'
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

export default OverViewContent;

interface IConfig {
  iconName: IconName;
  label: string;
  value: string | number;
}

const getUserOverview = (user: User | null): IConfig[] => {
  const { status } = getPlanStatusTag(user?.athleteSubscription?.[0]);
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
      value: user?.userPreferences?.dateOfBirth
        ? user.userPreferences?.bestTime?.completionPace
        : '-',
    },

    {
      iconName: 'subscription',
      label: 'Subscription',
      value: status ?? '-',
    },
  ];
};
