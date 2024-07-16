'use client';
import * as React from 'react';

import Button from '@/components/Buttons';
import ButtonLink from '@/components/links/ButtonLink';
import Typo from '@/components/typography/Typo';

import { useStoreActions } from '@/store';

import AuthDialog from '@/features/AuthDialog';
import { AuthDialogType } from '@/models/auth/auth.types';

import Logo from '~/svg/Logo.svg';

export default function HomePage() {
  const { openDialog } = useStoreActions(({ DialogStore: { openDialog } }) => ({
    openDialog,
  }));

  return (
    <div className='layout bg-gray-900 relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
      <Button
        className='m-6'
        variant='dark'
        onClick={() => openDialog(AuthDialogType.SIGNUP)}
      >
        Signup
      </Button>
      <Button variant='dark' onClick={() => openDialog(AuthDialogType.LOGIN)}>
        Login
      </Button>
      <Button
        variant='dark'
        onClick={() => openDialog(AuthDialogType.FORGOT_PASSWORD)}
      >
        Forgot password
      </Button>
      <Logo className='w-16' />

      <ButtonLink className='mt-6' href='/users-list' variant='light'>
        Listing users page
      </ButtonLink>
      <Typo classes='mt-2 text-sm text-gray-800'>
        A starter for Next.js, Tailwind CSS, and TypeScript, pre-configured with
        Husky{' '}
      </Typo>

      <ButtonLink className='mt-6' href='/components' variant='light'>
        See all components
      </ButtonLink>
      <AuthDialog />
    </div>
  );
}
