'use client';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';

import Typo from '@/components/typography/Typo';

import ForgotPassword from '@/features/Auth/ForgotPassword';
import authModel from '@/models/auth/auth.model';
import { ForgotPasswordFormData } from '@/models/auth/auth.types';

const ForgotPasswordScreen: FC = () => {
  const router = useRouter();

  const onForgotPassword = async (values: ForgotPasswordFormData) => {
    try {
      await authModel.forgotPassword(values);
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
          Forgot Password
        </Typo>
      </div>
      <ForgotPassword
        onGoBack={() => router.push('/login')}
        onForgotPassword={onForgotPassword}
      />
    </>
  );
};

export default ForgotPasswordScreen;
