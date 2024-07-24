import { type PropsWithChildren, useEffect } from 'react';

import { cn } from '@/lib/utils';
import useAsyncTask from '@/hooks/useAsyncTask';

import Button from '@/components/Buttons';
import PrimaryButton from '@/components/Buttons/PrimaryButton';
import Typo from '@/components/typography/Typo';

export interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  className?: string;
  containerClass?: string;
  agreeText?: string;
  cancelText?: string;
  onAgree: () => Promise<void> | void;
}

const ConfirmationDialog = (
  props: PropsWithChildren<ConfirmationDialogProps>,
) => {
  const {
    open,
    children,
    containerClass,
    className,
    agreeText = 'Yes',
    cancelText = 'No',
    onAgree,
    onClose,
  } = props;

  const onAgreeTask = useAsyncTask(onAgree);
  useEffect(() => {
    if (open)
      document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    return () => {
      document.getElementsByTagName('body')[0].style.overflow = 'unset';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className={cn(
        'fixed inset-0  z-[300] opacity-90 bg-gray-900  backdrop-blur-[6px]',
        className,
      )}
    >
      <div
        className={cn(
          'bg-transparent flex flex-col  py-10 px-[120px] mx-auto gap-10 w-[37.5rem]',
          containerClass,
        )}
      >
        {children}
        <div className='flex flex-row justify-between gap-2.5 w-full'>
          <div className='bg-gradient-to-r p-[1px] flex justify-center items-center from-linear-1 to-linear-2 rounded-[10px] w-full'>
            <Button
              onClick={onClose}
              className='px-5 py-2.5 bg-black-1 w-full rounded-[10px]'
            >
              <Typo classes='font-secondary font-semibold text-xl tracking-[-0.01px]'>
                {cancelText}
              </Typo>
            </Button>
          </div>
          <PrimaryButton
            onClick={onAgreeTask.run}
            isLoading={onAgreeTask.isLoading}
            className='px-5 scroll-py-2.5 rounded-[10px'
          >
            <Typo classes='font-secondary font-semibold text-xl tracking-[-0.01px]'>
              {agreeText}
            </Typo>
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
