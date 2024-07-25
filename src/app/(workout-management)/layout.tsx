import { FC, PropsWithChildren } from 'react';

import Header from '@/features/Header';

const workoutManagementLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex flex-col w-full ml-20'>
      <Header />
      {children}
    </div>
  );
};

export default workoutManagementLayout;
