import * as React from 'react';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from '@/lib/toast';

import { GLOBAL_TOAST_ID } from '@/constant/toast';
import { AppProviders } from '@/contexts/AppProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AppProviders>
          {children}
          <ToastContainer containerId={GLOBAL_TOAST_ID} />
        </AppProviders>
      </body>
    </html>
  );
}
