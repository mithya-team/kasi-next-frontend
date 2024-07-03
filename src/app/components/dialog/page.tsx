'use client';

import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import { useColorMode } from '@/hooks/useColorMode';

import Dialog from '@/components/Dialog';
import HybridButton from '@/components/hybridButtons/HybridButton';
import ButtonLink from '@/components/links/ButtonLink';
import Typo from '@/components/typography/Typo';

export default function ComponentDialogPage() {
  const { mode } = useColorMode();

  const [showDialog, setShowDialog] = useState(false);

  return (
    <main>
      <section className={cn(mode === 'dark' ? 'bg-dark' : 'bg-white')}>
        <div
          className={cn(
            'layout min-h-screen py-20',
            mode === 'dark' ? 'text-white' : 'text-black',
          )}
        >
          <Typo level='h1'>Dialog Component</Typo>
          <ButtonLink className='mt-2' href='/'>
            Back to Home
          </ButtonLink>

          <ol className='mt-8 space-y-6'>
            <li className='space-y-2'>
              <Typo level='h2' classes='text-lg md:text-xl'>
                Dialog
              </Typo>
              <div className='mt-1 text-sm'>
                <HybridButton onClick={() => setShowDialog(true)}>
                  Show Dialog
                </HybridButton>

                <Dialog
                  isOpen={showDialog}
                  hasCloseBtn
                  onClose={() => setShowDialog(false)}
                >
                  <div className='p-2'>
                    <Typo>Sample dialog</Typo>
                  </div>
                </Dialog>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}
