import {
  SettingItemConfig,
  SettingItemType,
} from '@/app/(account)/settings/@types';
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
    },
    {
      id: SettingItemType.NAME,
      label: 'Name',
      value: admin.fullName,
      icon: 'user',
    },
  ];

  if (!admin.emailVerified) {
    settings.push({
      label: 'Email Address',
      value: admin.email,
      id: SettingItemType.EMAIL,
      icon: 'email',
    });
  }

  settings.push({
    label: 'Password',
    value: '********',
    id: SettingItemType.PASSWORD,
    icon: 'update-password',
  });

  return settings;
};
