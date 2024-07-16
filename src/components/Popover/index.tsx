import * as RadixPopover from '@radix-ui/react-popover';
import { FC } from 'react';

import { cn } from '@/lib/utils';

interface PopoverProps {
  content: React.ReactNode;
  children: React.ReactNode;
  containerClassName?: string;
}

const Popover: FC<PopoverProps> = ({
  content,
  children,
  containerClassName,
}) => {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger>{children}</RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          side='bottom'
          align='center'
          sideOffset={10}
          className={cn(
            'bg-gray-700 z-[9999] w-[11.25rem] mr-5 flex flex-col gap-3 p-5 rounded-2xl',
            containerClassName,
          )}
        >
          {content}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};

export default Popover;
