'use client';

import { FC, PropsWithChildren } from 'react';

import { ColorModeProvider } from '@/contexts/ColorModeContext';

export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return <ColorModeProvider>{children}</ColorModeProvider>;
};
