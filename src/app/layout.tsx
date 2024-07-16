'use client';
import * as React from 'react';
import { useEffect } from 'react';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from '@/lib/toast';
import useAppInit from '@/hooks/useAppInIt';

import Loader from '@/components/Loader';

import { GLOBAL_TOAST_ID } from '@/constant/toast';
import { AppProviders } from '@/contexts/AppProvider';

const RootLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <body
        suppressHydrationWarning={true}
        className='w-[100vw] h-[100vh] bg-gray-900'
      >
        <AppProviders>
          <Layout>{children}</Layout>
          <ToastContainer containerId={GLOBAL_TOAST_ID} />
        </AppProviders>
      </body>
    </html>
  );
};

export default RootLayout;

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { init, appInitialized } = useAppInit();

  useEffect(() => {
    init();
  }, []);

  if (!appInitialized) return <Loader />;

  return <>{children}</>;
};
