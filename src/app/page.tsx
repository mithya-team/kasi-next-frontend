'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Loader from '@/components/Loader';

import { ROUTE } from '@/constant/route';

const Page = () => {
  const { push } = useRouter();
  useEffect(() => {
    push(ROUTE.USER_LIST_ROUTE.path);
  }, []);
  return <Loader />;
};

export default Page;
