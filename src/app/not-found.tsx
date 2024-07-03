import { Metadata } from 'next';
import * as React from 'react';

import Icon from '@/components/icons/Icon';
import Typo from '@/components/typography/Typo';

export const metadata: Metadata = {
  title: 'Not Found',
};

export default function NotFound() {
  return (
    <main>
      <section className='bg-white'>
        <div className='layout flex min-h-screen flex-col items-center justify-center text-center text-black'>
          <Icon
            name='alarm-warning'
            size={60}
            classNames={{
              element: 'drop-shadow-glow animate-flicker text-red-500',
            }}
          />
          <Typo level='h1' classes='mt-8 text-4xl md:text-6xl'>
            Page Not Found
          </Typo>
          <a href='/'>Back to home</a>
        </div>
      </section>
    </main>
  );
}
