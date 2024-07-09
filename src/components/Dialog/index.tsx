import { type PropsWithChildren } from 'react';

import { cn } from '@/lib/utils';

import SvgIcon from '@/components/SvgIcon';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  hasCloseIcon?: boolean;
  className?: string;
  containerClass?: string;
  closeOnBgPress?: boolean;
  crossIconClass?: string;
  crossColor?: string;
}

const Dialog = (props: PropsWithChildren<DialogProps>) => {
  const {
    open,
    onClose,
    children,
    hasCloseIcon = true,
    containerClass,
    closeOnBgPress = true,
    className,
    crossIconClass,
    crossColor,
  } = props;

  if (!open) return null;

  return (
    <div className={cn('fixed inset-0  z-[9999] bg-transparent', className)}>
      <div className={cn('flex justify-center items-center ')}>
        <div
          onClick={closeOnBgPress ? onClose : undefined}
          className='min-w-full min-h-screen bg-gray-900 opacity-90'
        />
        <div
          className={cn(
            'bg-gray-800 absolute rounded-[20px] pt-[20px] pb-[44px] px-[52px] max-w-[100vw] max-h-[100vh]',
            containerClass,
          )}
        >
          <div className={cn('flex justify-end w-full items-center pb-2')}>
            {hasCloseIcon ? (
              <button
                className={cn('relative left-5', crossIconClass)}
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
