import { Metadata } from 'next';
import * as React from 'react';

import Typo from '@/components/typography/Typo';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <Typo level='h1' classes='mt-8 text-4xl md:text-6xl'>
            Page Not Found
          </Typo>
          <a href='/'>Back to home</a>
        </div>
      </section>
    </main>
  );
}
