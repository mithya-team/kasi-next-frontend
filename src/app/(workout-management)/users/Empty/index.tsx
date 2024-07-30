import { FC } from 'react';

import { cn } from '@/lib/utils';

import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import AdminCode from '@/features/AdminCode';

const Empty: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'justify-center items-center flex mt-4 flex-col gap-9 w-[22rem] mx-auto',
        className,
      )}
    >
      <SvgIcon name='empty-user-list' />
      <Typo classes='font-secondary font-semibold tracking-[-0.225px] text-white text-3xl text-center'>
        There is no one runner available for coaching.
      </Typo>

      <Typo classes='font-primary text-base text-gray-300 text-center'>
        Share the code below with your runners. This will allow them to connect
        with you.
      </Typo>
      <AdminCode />
    </div>
  );
};

export default Empty;
