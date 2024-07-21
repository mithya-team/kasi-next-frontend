'use client'; // Error components must be Client Components

import * as React from 'react';

import TextButton from '@/components/Buttons/TextButton';
import Typo from '@/components/typography/Typo';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <Typo level='h1' classes='mt-8 text-4xl md:text-6xl'>
            Oops, something went wrong!
          </Typo>
          <TextButton variant='basic' onClick={reset} className='mt-4'>
            Try again
          </TextButton>
        </div>
      </section>
    </main>
  );
}
