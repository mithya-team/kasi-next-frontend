import {
  SettingItemConfig,
  SettingItemType,
} from '@/app/(account)/settings/@types';
import { SETTING_ROUTE } from '@/constant/route';
import { User } from '@/models/user/user.types';
export const getSettingItem = (
  admin: User | null,
  code: string | null,
): SettingItemConfig[] => {
  if (!admin) return [];

  const settings: SettingItemConfig[] = [
    {
      id: SettingItemType.CODE,
      label: 'Code',
      value: code ?? '',
      icon: 'code',
      href: SETTING_ROUTE.CODE.path,
    },
    {
      id: SettingItemType.NAME,
      label: 'Name',
      value: admin.fullName,
      icon: 'user',
      href: SETTING_ROUTE.NAME.path,
    },
  ];

  if (!admin.emailVerified) {
    settings.push({
      label: 'Email Address',
      value: admin.email,
      id: SettingItemType.EMAIL,
      icon: 'email',
      href: SETTING_ROUTE.EMAIL.path,
    });
  }

  settings.push({
    label: 'Password',
    value: '********',
    id: SettingItemType.PASSWORD,
    icon: 'update-password',
    href: SETTING_ROUTE.PASSWORD.path,
  });

  return settings;
};
