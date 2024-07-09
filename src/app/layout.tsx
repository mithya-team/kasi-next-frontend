'use client';
import * as React from 'react';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from '@/lib/toast';

import DashboardSidebar from '@/components/DashboardSidebar';

import { GLOBAL_TOAST_ID } from '@/constant/toast';
import { AppProviders } from '@/contexts/AppProvider';
import Header from '@/features/Header';

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <body>
        <AppProviders>
          <div className='flex flex-row min-h-screen bg-gray-900'>
            <DashboardSidebar />
            <div className='flex flex-col w-full ml-20'>
              <Header />
              <div className='flex-1 overflow-auto'>{children}</div>
            </div>
          </div>
          <ToastContainer containerId={GLOBAL_TOAST_ID} />
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;
