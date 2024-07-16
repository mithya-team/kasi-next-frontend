'use client';
import { FC, useEffect } from 'react';

import { useStoreActions } from '@/store';

import AuthDialog from '@/features/AuthDialog';
import { AuthDialogType } from '@/models/auth/auth.types';

const ResetPassword: FC = () => {
  const { openDialog } = useStoreActions(({ DialogStore: { openDialog } }) => ({
    openDialog,
  }));

  useEffect(() => {
    openDialog(AuthDialogType.RESET_PASSWORD);
  }, []);

  return <AuthDialog />;
};

export default ResetPassword;
