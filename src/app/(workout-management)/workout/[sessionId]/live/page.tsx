'use client';
import { FC } from 'react';

import Call from '@/features/BrowserCall';

const Page: FC = () => {
  return (
    <div className='text-white'>
      live screen
      <Call phoneNumber='+918777250782' />
    </div>
  );
};

export default Page;
