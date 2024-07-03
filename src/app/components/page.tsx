'use client';

import React from 'react';

import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';
import { useColorMode } from '@/hooks/useColorMode';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import TextButton from '@/components/buttons/TextButton';
import HybridButton from '@/components/hybridButtons/HybridButton';
import HybridIconButton from '@/components/hybridButtons/HybridIconButton';
import HybridTextButton from '@/components/hybridButtons/HybridTextButton';
import { IconMap } from '@/components/icons/Icon';
import ButtonLink from '@/components/links/ButtonLink';
import TextLink from '@/components/links/TextLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import NextImage from '@/components/NextImage';
import Skeleton from '@/components/Skeleton';
import Typo from '@/components/typography/Typo';

export type Color = (typeof colorList)[number];

export default function ComponentPage() {
  const { mode, toggleMode } = useColorMode();

  const notify = () => toast.success('hello from toast');

  const textColor = mode === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <main>
      <section className={cn(mode === 'dark' ? 'bg-dark' : 'bg-white')}>
        <div
          className={cn(
            'layout min-h-screen py-20',
            mode === 'dark' ? 'text-white' : 'text-black'
          )}
        >
          {mode}
          <Typo level='h1'>Built-in Components</Typo>
          <ButtonLink className='mt-2' href='/'>
            Back to Home
          </ButtonLink>

          <div className='mt-8 flex flex-wrap gap-2'>
            <Button
              onClick={toggleMode}
              variant={mode === 'dark' ? 'light' : 'dark'}
            >
              Set to {mode === 'dark' ? 'light' : 'dark'}
            </Button>
          </div>

          <div className='mt-8 flex flex-wrap gap-2'>
            <Button onClick={notify} variant='outline'>
              Notify!
            </Button>
          </div>

          <button onClick={notify}></button>

          <ol className='mt-8 space-y-6'>
            <li className='space-y-2'>
              <Typo level='h2' classes='text-lg md:text-xl'>
                Built-in Components
              </Typo>
              <Typo classes={['!mt-1 text-sm', textColor]}>
                You can change primary color to any Tailwind CSS colors. See
                globals.css to change your color.
              </Typo>
              <div className='flex flex-wrap gap-2 text-xs font-medium'>
                <div className='bg-primary-50 flex h-10 w-10 items-center justify-center rounded text-black'>
                  50
                </div>
                <div className='bg-primary-100 flex h-10 w-10 items-center justify-center rounded text-black'>
                  100
                </div>
                <div className='bg-primary-200 flex h-10 w-10 items-center justify-center rounded text-black'>
                  200
                </div>
                <div className='bg-primary-300 flex h-10 w-10 items-center justify-center rounded text-black'>
                  300
                </div>
                <div className='bg-primary-400 flex h-10 w-10 items-center justify-center rounded text-black'>
                  400
                </div>
                <div className='bg-primary-500 flex h-10 w-10 items-center justify-center rounded text-black'>
                  500
                </div>
                <div className='bg-primary-600 flex h-10 w-10 items-center justify-center rounded text-white'>
                  600
                </div>
                <div className='bg-primary-700 flex h-10 w-10 items-center justify-center rounded text-white'>
                  700
                </div>
                <div className='bg-primary-800 flex h-10 w-10 items-center justify-center rounded text-white'>
                  800
                </div>
                <div className='bg-primary-900 flex h-10 w-10 items-center justify-center rounded text-white'>
                  900
                </div>
                <div className='bg-primary-950 flex h-10 w-10 items-center justify-center rounded text-white'>
                  950
                </div>
              </div>
            </li>
            <li className='space-y-2'>
              <Typo level='h2' classes='text-lg md:text-xl'>
                UnstyledLink
              </Typo>
              <Typo classes={['!mt-1 text-sm', textColor]}>
                No style applied, differentiate internal and outside links, give
                custom cursor for outside links.
              </Typo>
              <div className='space-x-2'>
                <UnstyledLink href='/'>Internal Links</UnstyledLink>
                <UnstyledLink href='https://google.com'>
                  Outside Links
                </UnstyledLink>
              </div>
            </li>
            <li className='space-y-2'>
              <Typo level='h2' classes='text-lg md:text-xl'>
                PrimaryLink
              </Typo>
              <Typo classes={['!mt-1 text-sm', textColor]}>
                Add styling on top of UnstyledLink, giving a primary color to
                the link.
              </Typo>
              <div className='space-x-2'>
                <TextLink href='/'>Internal Links</TextLink>
                <TextLink href='https://google.com'>Outside Links</TextLink>
              </div>
            </li>
            <li className='space-y-2'>
              <Typo level='h2' classes='text-lg md:text-xl'>
                ButtonLink
              </Typo>
              <Typo classes={['!mt-1 text-sm', textColor]}>
                Button styled link with 3 variants.
              </Typo>
              <div className='flex flex-wrap gap-2'>
                <ButtonLink variant='primary' href='https://google.com'>
                  Primary Variant
                </ButtonLink>
                <ButtonLink
                  variant='outline'
                  isDarkBg={mode === 'dark'}
                  href='https://google.com'
                >
                  Outline Variant
                </ButtonLink>
                <ButtonLink
                  variant='ghost'
                  isDarkBg={mode === 'dark'}
                  href='https://google.com'
                >
                  Ghost Variant
                </ButtonLink>
                <ButtonLink variant='dark' href='https://google.com'>
                  Dark Variant
                </ButtonLink>
                <ButtonLink variant='light' href='https://google.com'>
                  Light Variant
                </ButtonLink>
              </div>
            </li>
            <li className='space-y-2'>
              <Typo level='h2' classes='text-lg md:text-xl'>
                Button
              </Typo>
              <Typo classes={['!mt-1 text-sm', textColor]}>
                Ordinary button with style.
              </Typo>
              <div className='flex flex-wrap gap-2'>
                <Button variant='primary'>Primary Variant</Button>
                <Button variant='outline' isDarkBg={mode === 'dark'}>
                  Outline Variant
                </Button>
                <Button variant='ghost' isDarkBg={mode === 'dark'}>
                  Ghost Variant
                </Button>
                <Button variant='dark'>Dark Variant</Button>
                <Button variant='light'>Light Variant</Button>
              </div>
              <div className='flex flex-wrap gap-2'>
                <Button
                  variant='primary'
                  leftIcon={IconMap['plus']}
                  rightIcon={IconMap['arrow-right']}
                >
                  Icon
                </Button>
                <Button
                  variant='outline'
                  leftIcon={IconMap['plus']}
                  rightIcon={IconMap['arrow-right']}
                  isDarkBg={mode === 'dark'}
                >
                  Icon
                </Button>
                <Button
                  variant='ghost'
                  leftIcon={IconMap['plus']}
                  rightIcon={IconMap['arrow-right']}
                  isDarkBg={mode === 'dark'}
                >
                  Icon
                </Button>
                <Button
                  variant='dark'
                  leftIcon={IconMap['plus']}
                  rightIcon={IconMap['arrow-right']}
                >
                  Icon
                </Button>
                <Button
                  variant='light'
                  leftIcon={IconMap['plus']}
                  rightIcon={IconMap['arrow-right']}
                >
                  Icon
                </Button>
              </div>
              <div className='!mt-4 flex flex-wrap gap-2'>
                <Button size='sm' variant='primary'>
                  Small Size
                </Button>
                <Button size='sm' variant='outline' isDarkBg={mode === 'dark'}>
                  Small Size
                </Button>
                <Button size='sm' variant='ghost' isDarkBg={mode === 'dark'}>
                  Small Size
                </Button>
                <Button size='sm' variant='dark'>
                  Small Size
                </Button>
                <Button size='sm' variant='light'>
                  Small Size
                </Button>
              </div>
              <div className='flex flex-wrap gap-2'>
                <Button
                  size='sm'
                  variant='primary'
                  leftIcon={IconMap['plus']}
                  rightIcon={IconMap['arrow-right']}
                >
                  Icon
                </Button>
                <Button
                  size='sm'
                  variant='outline'
                  leftIcon={IconMap['plus']}
                  rightIcon={IconMap['arrow-right']}
                  isDarkBg={mode === 'dark'}
                >
                  Icon
                </Button>
                <Button
                  size='sm'
                  variant='ghost'
                  leftIcon={IconMap['plus']}
                  rightIcon={IconMap['arrow-right']}
                  isDarkBg={mode === 'dark'}
                >
                  Icon
                </Button>

                <Button
                  size='sm'
                  variant='dark'
                  leftIcon={IconMap['plus']}
                  rightIcon={IconMap['arrow-right']}
                >
                  Icon
                </Button>
                <Button
                  size='sm'
                  variant='light'
                  leftIcon={IconMap['plus']}
                  rightIcon={IconMap['arrow-right']}
                >
                  Icon
                </Button>
              </div>

              <div className='!mt-4 flex flex-wrap gap-2'>
                <Button disabled variant='primary'>
                  Disabled
                </Button>
                <Button disabled variant='outline' isDarkBg={mode === 'dark'}>
                  Disabled
                </Button>
                <Button disabled variant='ghost' isDarkBg={mode === 'dark'}>
                  Disabled
                </Button>
                <Button disabled variant='dark'>
                  Disabled
                </Button>
                <Button disabled variant='light'>
                  Disabled
                </Button>
              </div>
              <div className='flex flex-wrap gap-2'>
                <Button isLoading variant='primary'>
                  Disabled
                </Button>
                <Button isLoading variant='outline' isDarkBg={mode === 'dark'}>
                  Disabled
                </Button>
                <Button isLoading variant='ghost' isDarkBg={mode === 'dark'}>
                  Disabled
                </Button>
                <Button isLoading variant='dark'>
                  Disabled
                </Button>
                <Button isLoading variant='light'>
                  Disabled
                </Button>
              </div>
            </li>
            <li className='space-y-2'>
              <Typo level='h2' classes='text-lg md:text-xl'>
                TextButton
              </Typo>
              <Typo classes={['!mt-1 text-sm', textColor]}>
                Button with a text style
              </Typo>
              <div className='space-x-2'>
                <TextButton>Primary Variant</TextButton>
                <TextButton variant='basic'>Basic Variant</TextButton>
              </div>
            </li>
            <li className='space-y-2'>
              <Typo level='h2' classes='text-lg md:text-xl'>
                IconButton
              </Typo>
              <Typo classes={['!mt-1 text-sm', textColor]}>
                Button with only icon inside
              </Typo>
              <div className='space-x-2'>
                <IconButton icon={IconMap['plus']} />
                <IconButton variant='outline' icon={IconMap['laptop']} />
                <IconButton variant='ghost' icon={IconMap['phone']} />
                <IconButton variant='dark' icon={IconMap['shield']} />
                <IconButton variant='light' icon={IconMap['credit-card']} />
              </div>
            </li>

            <li className='space-y-2'>
              <Typo level='h2' classes='text-lg md:text-xl'>
                Hybrid Buttons
              </Typo>
              <Typo classes={['!mt-1 text-sm', textColor]}>
                Can be used as either button or link
              </Typo>
              <div className='flex flex-wrap gap-2'>
                <HybridButton>Hybrid Button</HybridButton>
                <HybridButton href='https://www.google.com'>
                  Hybrid Link(ext)
                </HybridButton>
                <HybridButton href='/'>Hybrid Link(int)</HybridButton>
              </div>
              <div className='flex flex-wrap gap-2'>
                <HybridIconButton
                  variant='outline'
                  icon={IconMap['credit-card']}
                  onClick={() => alert('Button Clicked')}
                />

                <HybridIconButton
                  variant='dark'
                  href='https://www.google.com'
                  onClick={() => alert('Button Clicked')}
                  icon={IconMap['laptop']}
                />

                <HybridIconButton
                  variant='light'
                  href='/'
                  icon={IconMap['shield']}
                />
              </div>

              <div className='flex flex-wrap gap-2'>
                <HybridTextButton>Hybrid Button</HybridTextButton>
                <HybridTextButton href='https://www.google.com' variant='basic'>
                  Hybrid Link(ext)
                </HybridTextButton>
                <HybridTextButton href='/'>Hybrid Link(int)</HybridTextButton>
              </div>
            </li>

            <li className='space-y-2'>
              <Typo level='h2' classes='text-lg md:text-xl'>
                Custom 404 Page
              </Typo>
              <Typo classes={['!mt-1 text-sm', textColor]}>
                Styled 404 page with some animation.
              </Typo>
              <div className='flex flex-wrap gap-2'>
                <ButtonLink href='/404'>Visit the 404 page</ButtonLink>
              </div>
            </li>
            <li className='space-y-2'>
              <Typo level='h2' classes='text-lg md:text-xl'>
                Next Image
              </Typo>
              <Typo classes={['!mt-1 text-sm', textColor]}>
                Next Image with default props and skeleton animation.
              </Typo>
              <NextImage
                useSkeleton
                className='w-32 md:w-40'
                src='/favicon/android-chrome-192x192.png'
                width='180'
                height='180'
                alt='Icon'
              />
              <NextImage
                useSkeleton
                className='w-64 md:w-80'
                src='https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                width='360'
                height='360'
                alt='Image'
              />
            </li>

            <li className='space-y-2'>
              <Typo level='h2' classes='text-lg md:text-xl'>
                Skeleton
              </Typo>
              <Typo classes={['!mt-1 text-sm', textColor]}>
                Skeleton with shimmer effect
              </Typo>
              <Skeleton className='h-72 w-72' />
            </li>
          </ol>
        </div>
      </section>
    </main>
  );
}

const colorList = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const;
