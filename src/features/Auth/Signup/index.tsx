'use client';
import { FC, useState } from 'react';

import Button from '@/components/buttons/Button';
import TextButton from '@/components/buttons/TextButton';
import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import SignupForm from '@/features/Auth/Signup/SignupForm';

export interface SignUpProps {
  onLoginPress?: () => void;
}
const SignUp: FC<SignUpProps> = (props) => {
  const { onLoginPress } = props;
  const [showSignupForm, setShowSignupForm] = useState(false);

  const onSignupWithEmailClick = () => {
    setShowSignupForm(true);
  };

  return (
    <div className='flex flex-col gap-7 font-secondary font-semibold text-xl text-center text-white'>
      <Typo classes='tracking-[-0.75]' level='h2'>
        Sign Up
      </Typo>
      {showSignupForm ? (
        <SignupForm />
      ) : (
        <SignupMethods
          {...props}
          onSignupWithEmailClick={onSignupWithEmailClick}
        />
      )}
      <div className='flex flex-row justify-center items-baseline'>
        <Typo classes='font-primary font-medium text-sm text-gray-400'>
          Already have an account?{' '}
        </Typo>
        <TextButton
          onClick={onLoginPress}
          className='tracking-[-0.5] hover:text-white text-white'
        >
          Login
        </TextButton>
      </div>
    </div>
  );
};

export default SignUp;

interface SignupMethodsProps extends SignUpProps {
  onSignupWithEmailClick?: () => void;
  onGoggleAuthClick?: () => void;
}

const SignupMethods: FC<SignupMethodsProps> = ({
  onSignupWithEmailClick,
  onGoggleAuthClick,
}) => {
  return (
    <div className='flex flex-col gap-4'>
      <div className='border-0 bg-gradient-to-r h-12 p-[0.5px] rounded-[10px] from-linear-1 to-linear-2'>
        <Button
          onClick={onGoggleAuthClick}
          className='bg-black-1 h-full flex gap-2.5 w-full border-0  hover:bg-black-1 rounded-[10px] px-5 py-2.5'
          leftIcon={<SvgIcon name='google' />}
        >
          Sign up with Google
        </Button>
      </div>
      <Button
        onClick={onSignupWithEmailClick}
        className='tracking-[-0.75] h-12 border-0 rounded-[10px] bg-gradient-to-r from-linear-1 to-linear-2 py-2.5 px-5'
      >
        Sign up with Email
      </Button>
    </div>
  );
};
