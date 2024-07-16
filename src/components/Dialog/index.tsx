import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  hasCloseIcon?: boolean;
  className?: string;
  containerClass?: string;
  headingText?: string;
  closeOnBgPress?: boolean;
  crossIconClass?: string;
  crossColor?: string;
  hasKasiIcon?: boolean;
}

const Dialog = (props: PropsWithChildren<DialogProps>) => {
  const {
    open,
    onClose,
    children,
    hasCloseIcon = false,
    containerClass,
    closeOnBgPress = true,
    className,
    crossIconClass,
    crossColor,
    hasKasiIcon = true,
    headingText,
  } = props;

  if (!open) return null;

  return (
    <div className={cn('fixed inset-0  z-[300] bg-gray-900 ', className)}>
      <div className='h-[50vh] w-[30vw] absolute rotate-90 -top-[100px] -left-[100px] border-2 border-yellow-400 bg-violet-300 opacity-20 rounded-full' />
      <div className='h-[50vh] w-[30vw] absolute rotate-90 -top-[100px] -right-[100px] border bg-green-300 opacity-20 rounded-full' />
      <div className='h-[50vh] w-[30vw] absolute rotate-90 -bottom-[100px] -left-[100px] border bg-green-300 opacity-20 rounded-full' />
      <div className='h-[50vh] w-[30vw] absolute rotate-90 -bottom-[100px] -right-[100px] border bg-violet-300 opacity-20 rounded-full' />
      <div
        className={cn('flex justify-center items-center backdrop-blur-[160px]')}
      >
        <div
          onClick={closeOnBgPress ? onClose : undefined}
          className='min-w-full min-h-screen'
        />
        {hasKasiIcon ? (
          <SvgIcon name='kasi' className='absolute top-20 mx-auto' />
        ) : null}

        <div
          className={cn(
            'bg-gray-800 absolute flex flex-col rounded-[20px] py-10 px-[52px] max-w-[100vw] max-h-[100vh] border gap-7 border-gray-500 w-[28.5rem]',
            containerClass,
          )}
        >
          <div
            className={cn('flex justify-center w-full items-center', {
              ['justify-between']: hasCloseIcon,
            })}
          >
            {headingText ? (
              <Typo
                classes='tracking-1 text-center font-secondary font-semibold text-white pb-0'
                level='h2'
              >
                {headingText}
              </Typo>
            ) : null}
            {hasCloseIcon ? (
              <button
                className={cn('relative left-5 -top-4', crossIconClass)}
                onClick={onClose}
              >
                <SvgIcon name='cross' pathFill={crossColor} />
              </button>
            ) : null}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dialog;
