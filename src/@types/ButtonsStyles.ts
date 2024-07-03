export const ButtonVariantList = [
  'primary',
  'outline',
  'ghost',
  'light',
  'dark',
] as const;

export const ButtonSizeList = ['sm', 'base'] as const;

export const TextButtonVariantList = ['primary', 'basic'] as const;

export type ButtonVariant = (typeof ButtonVariantList)[number];
export type ButtonSize = (typeof ButtonSizeList)[number];

export type TextButtonVariant = (typeof TextButtonVariantList)[number];
