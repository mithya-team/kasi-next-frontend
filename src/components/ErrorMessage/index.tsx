import Image from 'next/image';
import { FC } from 'react';

import { cn } from '@/lib/utils';

export interface ErrorMessageProps {
  error: string;
  classes?: {
    root?: string;
    icon?: string;
    text?: string;
  };
}

const ErrorMessage: FC<ErrorMessageProps> = ({ error, classes = {} }) => {
  const { root = '', icon = '', text = '' } = classes;

  return (
    <div
      className={cn(
        `h-[46px] flex items-center gap-1 px-2 mt-2 rounded border-[1px] border-gray-5`,
        root,
      )}
    >
      <Image
        src='/images/x-circle.svg'
        alt='x icon'
        className={icon}
        width={20}
      />
      <p className={cn(` text-base`, text)}>{error}</p>
    </div>
  );
};

export default ErrorMessage;
