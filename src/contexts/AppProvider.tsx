'use client';

import { StoreProvider } from 'easy-peasy';
import { FC, PropsWithChildren } from 'react';

import { store } from '@/store/index';

import { ColorModeProvider } from '@/contexts/ColorModeContext';
import DialogProvider from '@/contexts/DialogContext';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StoreProvider store={store}>
      <DialogProvider>
        <ColorModeProvider>{children}</ColorModeProvider>
      </DialogProvider>
    </StoreProvider>
  );
};
