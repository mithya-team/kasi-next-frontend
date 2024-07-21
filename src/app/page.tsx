'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Loader from '@/components/Loader';

const Page = () => {
  const { push } = useRouter();
  useEffect(() => {
    push('/users');
  }, []);
  return <Loader />;
};

export default Page;
