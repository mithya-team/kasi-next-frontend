'use client';
import * as React from 'react';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import DashboardSidebar from '@/components/DashboardSidebar';

import Header from '@/features/Header';

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex flex-row min-h-screen bg-gray-900'>
      <DashboardSidebar />
      <div className='flex flex-col w-full ml-20'>
        <Header />
        <div className='flex-1 overflow-auto'>{children}</div>
      </div>
    </div>
  );
};

export default RootLayout;
