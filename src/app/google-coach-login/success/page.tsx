'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import useAuthActions from '@/hooks/useAuthActions';

import Loader from '@/components/Loader';

const GoogleCoachLoginSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');

  const { authenticate } = useAuthActions();

  useEffect(() => {
    if (accessToken && refreshToken) {
      authenticate({ accessToken, refreshToken });
      router.push('/');
    }
  }, [accessToken, refreshToken]);

  return <Loader />;
};

export default GoogleCoachLoginSuccess;
