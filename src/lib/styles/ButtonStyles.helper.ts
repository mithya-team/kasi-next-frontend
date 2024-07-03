import { cn } from '@/lib/utils';

import {
  ButtonSize,
  ButtonVariant,
  TextButtonVariant,
} from '@/@types/ButtonsStyles';

export const getButtonStyles = (
  variant: ButtonVariant,
  size: ButtonSize,
  isDarkBg = false
) => {
  const baseClasses = cn(
    'button inline-flex items-center justify-center rounded font-medium',
    'focus-visible:ring-primary-500 focus:outline-none focus-visible:ring',
    'shadow-sm',
    'transition-colors duration-75',
    'disabled:cursor-not-allowed'
  );

  // Combine shared size classes
  const sizeClassesConfig = {
    base: cn(['px-3 py-1.5', 'text-sm md:text-base']),
    sm: cn(['px-2 py-1', 'text-xs md:text-sm']),
  };

  const variantClassesConfig = {
    primary: cn(
      'bg-primary-500 text-white',
      'border-primary-600 border',
      'hover:bg-primary-600 hover:text-white',
      'active:bg-primary-700',
      'disabled:bg-primary-700'
    ),
    outline: cn(
      'text-primary-500',
      'border-primary-500 border',
      'hover:bg-primary-50 active:bg-primary-100',
      ...(isDarkBg
        ? ['hover:bg-gray-900 active:bg-gray-800', 'disabled:bg-gray-800']
        : [])
    ),
    ghost: cn(
      'text-primary-500',
      'shadow-none',
      'hover:bg-primary-50 active:bg-primary-100',
      ...(isDarkBg
        ? ['hover:bg-gray-900 active:bg-gray-800', 'disabled:bg-gray-800']
        : [])
    ),
    light: cn(
      'bg-white text-gray-700',
      'border border-gray-300',
      'hover:text-dark hover:bg-gray-100',
      'active:bg-white/80 disabled:bg-gray-200'
    ),
    dark: cn(
      'bg-gray-900 text-white',
      'border border-gray-600',
      'hover:bg-gray-800 active:bg-gray-700',
      'disabled:bg-gray-700'
    ),
  };

  return {
    baseClasses,
    sizeClasses: sizeClassesConfig?.[size] || '',
    variantClasses: variantClassesConfig?.[variant] || '',
  };
};

export const getTextButtonStyles = (variant: TextButtonVariant) => {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-semibold',
    'focus-visible:ring-primary-500 focus:outline-none focus-visible:ring',
    'transition duration-100',
    'disabled:cursor-not-allowed disabled:brightness-105 disabled:hover:underline'
  );

  const variantClassesConfig = {
    primary: cn(
      'text-primary-500 hover:text-primary-600 active:text-primary-700',
      'disabled:text-primary-200'
    ),
    basic: cn(
      'text-black hover:text-gray-600 active:text-gray-800',
      'disabled:text-gray-300'
    ),
  };

  return {
    baseClasses,
    variantClasses: variantClassesConfig?.[variant] || '',
  };
};
