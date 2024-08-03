import React from 'react';

import Typo from '@/components/typography/Typo';

import AdminCode from '@/features/AdminCode';

function Code() {
  return (
    <div className='flex flex-col gap-5'>
      <Typo classes='font-primary text-base text-gray-300 text-center '>
        Your new code is...
      </Typo>
      <AdminCode className='mt-0' />
    </div>
  );
}

export default Code;
