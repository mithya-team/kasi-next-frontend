'use client';
import { FC } from 'react';

import AuthFormFooter from '@/components/AuthFormFooter';
import PrimaryButton from '@/components/Buttons1/PrimaryButton';

import SignupForm from '@/features/Auth/Signup/SignupForm';
import SocialAuth from '@/features/Auth/SocialAuth';
import { SignupFormData } from '@/models/auth/auth.types';

export interface SignUpProps {
  redirectToLogin: () => void;
  showSignupForm: boolean;
  onSignupWithEmailClick: () => void;
  onSignup: (values: SignupFormData) => Promise<void>;
}
const SignUp: FC<SignUpProps> = (props) => {
  const { redirectToLogin, showSignupForm } = props;

  return (
    <div className='flex flex-col gap-7 text-white'>
      {showSignupForm ? (
        <SignupForm {...props} />
      ) : (
        <SignupMethods {...props} />
      )}
      <AuthFormFooter
        onClick={redirectToLogin}
        primaryText='Login'
        helperText='Already have an account?'
      />
    </div>
  );
};

export default SignUp;

interface SignupMethodsProps extends SignUpProps {}

const SignupMethods: FC<SignupMethodsProps> = ({ onSignupWithEmailClick }) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='border-0 bg-gradient-to-r h-12 p-[0.5px] rounded-[10px] from-linear-1 to-linear-2'>
        <SocialAuth title='Sign up with Google' />
      </div>
      <PrimaryButton onClick={onSignupWithEmailClick}>
        Sign up with Email
      </PrimaryButton>
    </div>
  );
};
