'use client';
import dayjs from 'dayjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useMemo } from 'react';

import { cn } from '@/lib/utils';
import { formatTime } from '@/lib/workout';

import StartCallButton from '@/components/Buttons/StartCallButton';
import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { useStoreState } from '@/store';

import withAuth from '@/hoc/withAuth';
const timerClass =
  'font-secondary text-2xl font-semibold tracking-[-0.144px] text-white pb-2 border-b border-gray-800 text-center';
const timerLabelClass =
  'font-primary font-medium text-xs text-center text-white leading-[20px]';
const timerContainerClass = 'flex flex-col gap-[5px] w-1/3 ';

const UpcomingRunScreen: FC = () => {
  const pathname = usePathname();
  const clientId = pathname.split('/')[2];
  const sessionId = pathname.split('/')[4];
  const { workoutSessionDetails } = useStoreState(
    ({ WorkoutStore: { workoutSessionDetails } }) => ({
      workoutSessionDetails,
    }),
  );
  const startDate = dayjs(workoutSessionDetails?.startTime);
  const now = dayjs();

  const { diffInMinutes, isPast, timeRemaining } = useMemo(() => {
    const diffInMinutes = startDate.diff(now, 'minute');

    const timeRemaining = formatTime(startDate);
    const isPast = diffInMinutes < 0;
    return {
      isPast,
      timeRemaining,
      diffInMinutes,
    };
  }, [startDate]);

  return (
    <div className=' mx-auto mt-[60px] w-[24.5rem]'>
      <div className='flex flex-col justify-center items-center gap-5'>
        <SvgIcon name='upcoming' />
        <Typo classes='font-secondary text-3xl text-white font-semibold tracking-[-0.225px]'>
          Starting in
        </Typo>
        <div className='px-10 py-2.5 flex justify-between w-full flex-row gap-4'>
          <div className={timerContainerClass}>
            <Typo classes={timerClass}>
              {isPast ? '00' : String(timeRemaining.days).padStart(2, '0')}
            </Typo>
            <Typo classes={timerLabelClass}>Days</Typo>
          </div>
          <div className={timerContainerClass}>
            <Typo classes={timerClass}>
              {isPast ? '00' : String(timeRemaining.minutes).padStart(2, '0')}
            </Typo>
            <Typo classes={timerLabelClass}>Minutes</Typo>
          </div>
          <div className={timerContainerClass}>
            <Typo classes={timerClass}>
              {isPast ? '00' : String(timeRemaining.seconds).padStart(2, '0')}
            </Typo>
            <Typo classes={timerLabelClass}>Seconds</Typo>
          </div>
        </div>
        {diffInMinutes > 30 ? (
          <Typo classes='font-secondary text-center font-semibold text-gray-200 text-2xl tracking-[-0.144px]'>
            You can start or receive calls for{' '}
            {workoutSessionDetails?.workoutConfig?.name} 30 minutes before the
            session begins.
          </Typo>
        ) : (
          <Link
            href={`/user/${clientId}/workout/${sessionId}/live`}
            className='px-32 py-5 bg-gray-800 rounded-xl'
          >
            <StartCallButton
              disabled={isPast}
              className={cn('p-3.5', { ['opacity-60']: isPast })}
              classNames={{ leftIcon: 'mr-0' }}
              svgProps={{ width: '24', height: '24' }}
            >
              Start Call
            </StartCallButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export default withAuth(UpcomingRunScreen);
