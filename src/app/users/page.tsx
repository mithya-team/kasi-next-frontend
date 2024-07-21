'use client';
import Link from 'next/link';
import { FC, useEffect } from 'react';

import { getPlanStatusTag, parseDate } from '@/lib/utils';

import Loader from '@/components/Loader';
import SvgIcon from '@/components/SvgIcon';

import { useStoreActions, useStoreState } from '@/store';

import withAuth from '@/hoc/withAuth';

const UsersListingPage: FC = () => {
  const { usersList, isLoading } = useStoreState(
    ({ UserStore: { usersList, isLoading } }) => ({
      usersList,
      isLoading,
    }),
  );

  const { fetchUsersList } = useStoreActions(
    ({ UserStore: { fetchUsersList } }) => ({
      fetchUsersList,
    }),
  );

  useEffect(() => {
    fetchUsersList({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loader className='h-[100vh]' />;
  return (
    <div className='w-full px-5 font-medium font-primary overflow-auto'>
      <div className='flex bg-gray-800 text-base  text-gray-400 mb-5'>
        <div className='w-[21.62%] py-3 pl-5'>Username</div>
        <div className='w-[10.29%] py-3 pl-5'>Joined</div>
        <div className='w-[16.91%] py-3 pl-5'>Status</div>
        <div className='w-[21.62%] py-3 pl-5'>Email</div>
        <div className='w-[21.62%] py-3 pl-5'>Status</div>
        <div className='w-[5.00%] py-3 pl-5' />
      </div>
      {usersList?.map((user, index) => {
        const { status, className } = getPlanStatusTag(
          user?.athleteSubscription?.[0],
        );
        return (
          <div
            key={index}
            className='flex border-b border-gray-800 text-sm leading-[14px] text-white'
          >
            <div className='w-[21.62%] p-5 text-ellipsis overflow-hidden'>
              <Link href={`/user/${encodeURIComponent(user._id)}`}>
                {user?.fullName}
              </Link>
            </div>
            <div className='w-[10.29%] p-5'>
              {parseDate(user?.createdAt, 'MMMM D, YYYY')}
            </div>
            <div className={`w-[16.91%] p-5 ${className}`}>{status}</div>
            <div className='w-[21.62%] p-5 text-ellipsis overflow-hidden'>
              {user?.email}
            </div>
            <div className='w-[21.62%] p-5 text-gray-500'>
              Member already exists
            </div>
            <button className='w-[5.00%] p-5'>
              <SvgIcon name='three-dots' />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default withAuth(UsersListingPage);
