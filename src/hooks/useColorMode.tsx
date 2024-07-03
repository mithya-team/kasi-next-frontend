import React from 'react';

import {
  ColorModeContext,
  ColorModeContextProps,
} from '@/contexts/ColorModeContext';

export const useColorMode = (): ColorModeContextProps => {
  const context = React.useContext(ColorModeContext);
  return context;
};
