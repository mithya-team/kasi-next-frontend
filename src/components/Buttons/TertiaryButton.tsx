import { FC } from 'react';

import Button, { ButtonProps } from '@/components/Buttons';

const TertiaryButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <div className='bg-gradient-to-r p-[1px] flex justify-center items-center from-linear-1 to-linear-2 rounded-[10px] w-full'>
      <Button
        {...props}
        className='px-5 py-2.5 bg-black-1 w-full rounded-[10px]'
      >
        {children}
      </Button>
    </div>
  );
};

export default TertiaryButton;
