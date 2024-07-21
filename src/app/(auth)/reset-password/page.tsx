'use client';
import { isAxiosError } from 'axios';
import { useSearchParams } from 'next/navigation';
import { FC, useState } from 'react';

import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';

import Typo from '@/components/typography/Typo';

import ResetPassword from '@/features/Auth/ResetPassword';
import authModel from '@/models/auth/auth.model';
import { ResetFormData } from '@/models/auth/auth.types';

const ResetPasswordScreen: FC = () => {
  const [isResetPasswordSuccessful, setIsResetPasswordSuccessful] =
    useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const handleSubmit = async (values: ResetFormData) => {
    try {
      if (!token) return;
      await authModel.ResetPassword(token, values.password);
      setIsResetPasswordSuccessful(true);
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  };

  return (
    <>
      <div className={cn('flex justify-center w-full items-center')}>
        <Typo
          classes='tracking-1 text-center font-secondary font-semibold text-white pb-0'
          level='h2'
        >
          {isResetPasswordSuccessful ? '' : 'Enter your new password'}
        </Typo>
      </div>
      <ResetPassword
        isResetPasswordSuccessful={isResetPasswordSuccessful}
        onResetPassword={handleSubmit}
      />
    </>
  );
};

export default ResetPasswordScreen;
