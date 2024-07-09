'use client';

import Head from 'next/head';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import ButtonLink from '@/components/links/ButtonLink';
import TextLink from '@/components/links/TextLink';
import Typo from '@/components/typography/Typo';

import { DialogContext } from '@/contexts/DialogContext';

import Logo from '~/svg/Logo.svg';

// !INITIAL_CONFIG -> Select !INITIAL_CONFIG and CMD + SHIFT + F
// Before you begin editing, follow all comments with `INITIAL_CONFIG`,
// to customize the default configuration.

export default function HomePage() {
  const { showDialog } = React.useContext(DialogContext);

  const onSignup = () => {
    showDialog(
      <>
        Before you begin editing, follow all comments with `INITIAL_CONFIG`, to
        customize the default configuration. Before you begin editing, follow
        all comments with `INITIAL_CONFIG`, to customize the default
        configuration. Before you begin editing, follow all comments with
        `INITIAL_CONFIG`, to customize the default configuration. Before you
        begin editing, follow all comments with `INITIAL_CONFIG`, to customize
        the default configuration. Before you begin editing, follow all comments
        with `INITIAL_CONFIG`, to customize the default configuration. Before
        you begin editing, follow all comments with `INITIAL_CONFIG`, to
        customize the default configuration.
      </>,
      {
        containerClass: 'w-[28rem]',
      },
    );
  };

  return (
    <main>
      <Head>
        <title>Hi</title>
      </Head>
      <section className='bg-white'>
        <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
          <Button className='m-6' variant='dark' onClick={onSignup}>
            Signup
          </Button>
          <Button variant='dark'>Login</Button>
          <Logo className='w-16' />

          <ButtonLink className='mt-6' href='/users-list' variant='light'>
            Listing users page
          </ButtonLink>
          <Typo classes='mt-2 text-sm text-gray-800'>
            A starter for Next.js, Tailwind CSS, and TypeScript, pre-configured
            with Husky{' '}
          </Typo>

          <ButtonLink className='mt-6' href='/components' variant='light'>
            See all components
          </ButtonLink>

          <footer className='absolute bottom-2 text-gray-700'>
            © {new Date().getFullYear()} By{' '}
            <TextLink href='https://mithyalabs.com'>Mithyalabs</TextLink>
          </footer>
        </div>
      </section>
    </main>
  );
}
