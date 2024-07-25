'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { cn } from '@/lib/utils';

import Loader from '@/components/Loader';

import { useStoreState } from '@/store';

import OverViewContent from '@/app/(workout-management)/user/[userId]/OverViewContent';
import WorkoutContent from '@/app/(workout-management)/user/[userId]/WorkoutContent';
import withAuth from '@/hoc/withAuth';

const UserDetails = () => {
  const {
    showUserWorkoutContent,
    userLoading,
    user,
    usersList,
    usersListLoading,
    userWorkoutData,
  } = useStoreState(
    ({
      UserStore: {
        showUserWorkoutContent,
        isLoading: userLoading,
        user,
        usersList,
        usersListLoading,
      },
      WorkoutStore: { userWorkoutData },
    }) => ({
      showUserWorkoutContent,
      userLoading,
      user,
      usersList,
      usersListLoading,
      userWorkoutData,
    }),
  );

  const pathname = usePathname();
  const userId = pathname.split('/')[2];

  const renderUserList = () => {
    if (usersListLoading) {
      return <Loader className='h-[100vh]' />;
    }
    return usersList?.map((user, index) => (
      <Link
        href={`/user/${user?._id}`}
        className={cn(
          'p-5 block text-sm border-b border-gray-800  text-white leading-[14px] font-primary font-medium',
          { 'bg-gray-800': user?._id === userId },
        )}
        key={index}
      >
        {user?.fullName}
      </Link>
    ));
  };

  const renderContent = () => {
    if (userLoading) {
      return <Loader />;
    }
    if (showUserWorkoutContent) {
      return <WorkoutContent userWorkoutData={userWorkoutData} />;
    }
    return <OverViewContent user={user} />;
  };

  return (
    <div className='flex flex-row'>
      <div className='w-[23%] h-[100vh] border-r border-gray-800'>
        {renderUserList()}
      </div>
      <div className='w-[45%] my-5 mx-auto flex flex-col gap-5 text-sm text-white font-primary font-medium leading-[14px]'>
        {renderContent()}
      </div>
    </div>
  );
};

export default withAuth(UserDetails);
