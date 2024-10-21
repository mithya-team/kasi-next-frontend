'use client';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { cn } from '@/lib/utils';
import useAuthActions from '@/hooks/useAuthActions';

import Typo from '@/components/typography/Typo';

import { ROUTE } from '@/constant/route';
import SignUp from '@/features/Auth/Signup';
import { SignupFormData } from '@/models/auth/auth.types';

const SignupScreen: FC = () => {
  const [showSignupForm, setShowSignupForm] = useState<boolean>(false);
  const { signUp } = useAuthActions();
  const router = useRouter();

  const onSignup = async (values: SignupFormData) => {
    await signUp(values);
    setShowSignupForm(false);
    router.push(ROUTE.USER_LIST_ROUTE.path);
  };

  return (
    <>
      <div className={cn('flex justify-center w-full items-center')}>
        <Typo
          classes='tracking-1 text-center font-secondary font-semibold text-white pb-2.5'
          level='h2'
        >
          Sign Up
        </Typo>
      </div>
      <SignUp
        redirectToLogin={() => router.push('/login')}
        onSignup={onSignup}
        showSignupForm={showSignupForm}
        onSignupWithEmailClick={() => setShowSignupForm(true)}
      />
    </>
  );
};

export default SignupScreen;
