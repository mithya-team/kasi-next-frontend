'use client';
import { FC } from 'react';

import SegmentCard from '@/features/SegmentCard';
import WorkoutConfigHeader from '@/features/WorkoutConfigHeader';
import withAuth from '@/hoc/withAuth';

const PastScreen: FC = () => {
  return (
    <div className='text-white mt-[60px] flex flex-col gap-5'>
      <div className='flex flex-row gap-5 justify-center items-center px-[96px]'>
        <WorkoutConfigHeader />
      </div>
      <div className='flex flex-col justify-center items-start mt-5'>
        <SegmentCard />
      </div>
    </div>
  );
};

export default withAuth(PastScreen);
