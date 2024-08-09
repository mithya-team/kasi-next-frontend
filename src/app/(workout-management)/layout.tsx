'use client';
import { usePathname } from 'next/navigation';
import { FC, PropsWithChildren, useEffect } from 'react';

import { useStoreActions, useStoreState } from '@/store';

import Header from '@/features/Header';

const WorkoutManagementLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const isUserDetailsPage = pathname.split('/')[1] === 'user';

  const { usersList } = useStoreState(({ UserStore: { usersList } }) => ({
    usersList,
  }));

  const { fetchUsersList } = useStoreActions(
    ({ UserStore: { fetchUsersList } }) => ({
      fetchUsersList,
    }),
  );
  useEffect(() => {
    if (!usersList?.length && isUserDetailsPage) fetchUsersList({});
  }, []);
  return (
    <div className='flex flex-col w-full ml-20 overflow-'>
      <Header />
      <div className='w-full h-full overflow-auto'>{children}</div>
    </div>
  );
};

export default WorkoutManagementLayout;
