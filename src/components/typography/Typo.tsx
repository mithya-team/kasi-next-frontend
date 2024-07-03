import { ClassValue } from 'clsx';
import React, { FC } from 'react';

import { cn } from '@/lib/utils';

type TypographyLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
type FontWeight = 'normal' | 'bold' | 'semibold' | 'light';

export interface ITyopoProps {
  level?: TypographyLevel;
  weight?: FontWeight;
  children: React.ReactNode;
  inline?: boolean;
  overflow?: boolean;
  classes?: ClassValue;
}

const Typo: FC<ITyopoProps> = (props) => {
  const {
    level = 'p',
    weight = 'normal',
    children,
    inline,
    overflow,
    classes,
  } = props;

  const textClass = cn(
    level,
    weight === 'bold' ? 'font-bold' : '',
    weight === 'semibold' ? 'font-semibold' : '',
    weight === 'light' ? 'font-light' : '',
    overflow ? 'text-overflow' : '',
    classes
  );

  if (inline) {
    return <span className={textClass}>{children}</span>;
  }

  const Element = level === 'p' ? 'p' : level;
  return <Element className={textClass}>{children}</Element>;
};

export default Typo;
