import { FC, PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

const AuthLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={cn('fixed inset-0 z-[300] bg-gray-900')}>
      <div className='h-[50vh] w-[30vw] absolute rotate-90 -top-[100px] -left-[100px] border-2 border-yellow-400 bg-violet-300 opacity-20 rounded-full' />
      <div className='h-[50vh] w-[30vw] absolute rotate-90 -top-[100px] -right-[100px] border bg-green-300 opacity-20 rounded-full' />
      <div className='h-[50vh] w-[30vw] absolute rotate-90 -bottom-[100px] -left-[100px] border bg-green-300 opacity-20 rounded-full' />
      <div className='h-[50vh] w-[30vw] absolute rotate-90 -bottom-[100px] -right-[100px] border bg-violet-300 opacity-20 rounded-full' />

      <div
        className={cn('flex justify-center items-center backdrop-blur-[160px]')}
      >
        <div className='min-w-full min-h-screen' />
        <div
          className={cn(
            'bg-gray-800 absolute flex flex-col rounded-[20px] max-w-[100vw] max-h-[100vh] border gap-7 border-gray-500 w-[30rem]',
          )}
        >
          <div
            className='overflow-y-auto pt-10 pb-9 px-[52px] mb-2.5'
            style={{ maxHeight: 'calc(100vh - 80px)' }} // To ensure padding from top and bottom
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
