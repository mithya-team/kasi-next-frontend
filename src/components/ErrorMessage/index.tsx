import Image from 'next/image';
import { FC } from 'react';

import { cn } from '@/lib/utils';

import SvgIcon from '@/components/SvgIcon';

export interface ErrorMessageProps {
  error: string;
  src?: string;
  classes?: {
    root?: string;
    icon?: string;
    text?: string;
  };
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error, src, classes = {} }) => {
  const { root = '', icon = '', text = '' } = classes;

  return (
    <div className={cn(`flex items-center gap-1`, root)}>
      {src ? (
        <Image
          src='/images/x-circle.svg'
          alt='x icon'
          className={icon}
          width={20}
        />
      ) : (
        <SvgIcon name='error' />
      )}

      <p className={cn(` text-xs font-primary text-red-400 font-medium`, text)}>
        {error}
      </p>
    </div>
  );
};

export default ErrorMessage;
