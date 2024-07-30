'use client';
import { isAxiosError } from 'axios';
import { useState } from 'react';

import { toast } from '@/lib/toast';

import { useStoreActions, useStoreState } from '@/store';

import {
  EmailFormValues,
  NameFormValues,
  PasswordFormValues,
  SettingItemConfig,
  SettingItemFormValues,
  SettingItemType,
} from '@/app/(account)/settings/@types';
import AdminInfo from '@/app/(account)/settings/Section/AdminInfo';
import SettingItem from '@/app/(account)/settings/Section/SettingItem';
import adminModel from '@/models/admin/admin.model';

const Settings = () => {
  const { admin } = useStoreState(({ AdminStore: { admin } }) => ({ admin }));
  const { setAdmin, setAdminCode } = useStoreActions(
    ({ AdminStore: { setAdmin, setAdminCode } }) => ({
      setAdmin,
      setAdminCode,
    }),
  );

  const [editItemId, setEditItemId] = useState<SettingItemType>();

  const onSettingItemClick = (item: SettingItemConfig) => {
    setEditItemId(item.id);
  };

  const onAction = async (values: SettingItemFormValues) => {
    if (!admin?._id) return;
    try {
      if (editItemId === SettingItemType.NAME) {
        const res = await adminModel.updateAdmin(admin._id, {
          fullName: (values as NameFormValues).name,
        });
        if (res) setAdmin(res);
      } else if (editItemId === SettingItemType.EMAIL) {
        const res = await adminModel.updateAdmin(admin._id, {
          email: (values as EmailFormValues).email,
        });
        if (res) setAdmin(res);
      } else if (editItemId === SettingItemType.CODE) {
        setEditItemId(undefined);
      } else if (editItemId === SettingItemType.PASSWORD) {
        const res = await adminModel.updatePassword(admin?._id, {
          newPassword: (values as PasswordFormValues)?.newPassword,
          oldPassword: (values as PasswordFormValues)?.oldPassword,
        });
        if (res) setAdmin(res);
      }

      toast.success('Edit successful!');
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    } finally {
      setEditItemId(undefined);
    }
  };

  const onRegenerateCoachCode = async () => {
    if (!admin?._id) return;
    try {
      const res = await adminModel.generateInviteCode(admin?._id);
      if (res?.code) setAdminCode(res.code);
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  };

  return (
    <div className='flex flex-col gap-9 mx-auto w-[32.5rem] items-center justify-center py-10'>
      {editItemId ? (
        <SettingItem
          onRegenerateCoachCode={onRegenerateCoachCode}
          itemId={editItemId}
          onAction={onAction}
        />
      ) : (
        <AdminInfo onItemClick={onSettingItemClick} />
      )}
    </div>
  );
};

export default Settings;
