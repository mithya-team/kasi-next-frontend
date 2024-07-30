import { IconName } from '@/components/SvgIcon';

export enum SettingItemType {
  CODE = 'code',
  NAME = 'name',
  EMAIL = 'email',
  PASSWORD = 'password',
}

export interface SettingItemConfig {
  label: string;
  value: string;
  icon: IconName;
  id: SettingItemType;
}

export interface EmailFormValues {
  email: string;
}

export interface NameFormValues {
  name: string;
}

export interface PasswordFormValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type SettingItemFormValues =
  | EmailFormValues
  | NameFormValues
  | PasswordFormValues;
