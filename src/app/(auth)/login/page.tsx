'use client';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { cn } from '@/lib/utils';
import useAuthActions from '@/hooks/useAuthActions';

import Typo from '@/components/typography/Typo';

import Login from '@/features/Auth/Login';
import { LoginFormData } from '@/models/auth/auth.types';

const LoginScreen: FC = () => {
  const { login } = useAuthActions();
  const router = useRouter();
  const onLogin = async (values: LoginFormData) => {
    await login(values);
    router.push('/users');
  };

  return (
    <>
      <div className={cn('flex justify-center w-full items-center')}>
        <Typo
          classes='tracking-1 text-center font-secondary font-semibold text-white pb-0'
          level='h2'
        >
          Sign In
        </Typo>
      </div>
      <Login
        onForgotPasswordClick={() => router.push('/forgot-password')}
        onLogin={onLogin}
        onSignupPress={() => router.push('/signup')}
      />
    </>
  );
};

export default LoginScreen;
