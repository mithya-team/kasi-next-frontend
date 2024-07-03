'use client';

/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react';

import { TColorMode } from '@/@types/App.types';

export type ColorModeContextProps = {
  mode: TColorMode;
  setMode: (mode: TColorMode) => void;
  toggleMode: () => void;
};

const ColorModeContext = React.createContext<ColorModeContextProps>({
  mode: 'light', // Initial mode
  setMode: () => {},
  toggleMode: () => {},
});

const ColorModeProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = React.useState<TColorMode>('light');

  const toggleMode = () => setMode(mode === 'light' ? 'dark' : 'light');

  return (
    <ColorModeContext.Provider
      value={{
        mode,
        setMode,
        toggleMode,
      }}
    >
      {children}
    </ColorModeContext.Provider>
  );
};

export { ColorModeContext, ColorModeProvider };
