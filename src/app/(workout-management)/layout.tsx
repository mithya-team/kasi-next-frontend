'use client';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useStoreActions, useStoreState } from '@/store';

import Header from '@/features/Header';

const WorkoutManagementLayout: FC<PropsWithChildren> = ({ children }) => {
  const { usersList } = useStoreState(({ UserStore: { usersList } }) => ({
    usersList,
  }));

  const { fetchUsersList } = useStoreActions(
    ({ UserStore: { fetchUsersList } }) => ({
      fetchUsersList,
    }),
  );
  useEffect(() => {
    if (!usersList?.length) fetchUsersList({});
  }, []);
  return (
    <div className='flex flex-col w-full ml-20'>
      <Header />
      <div className='w-full h-full overflow-hidden'>{children}</div>
    </div>
  );
};

export default WorkoutManagementLayout;
