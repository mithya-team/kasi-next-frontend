import { FC } from 'react';

import { cn } from '@/lib/utils';

import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

const EmptyUserWorkout: FC<{ className?: string; helperText?: string }> = ({
  className,
  helperText,
}) => {
  return (
    <div
      className={cn(
        'justify-center items-center flex flex-col gap-5',
        className,
      )}
    >
      <SvgIcon name='empty-workout' />
      <Typo classes='font-primary text-base text-gray-500 text-center'>
        {helperText}
      </Typo>
    </div>
  );
};

export default EmptyUserWorkout;
