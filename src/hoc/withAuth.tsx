import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useStoreState } from '@/store';

const withAuth = (WrappedComponent: React.ComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = (props: any) => {
    const router = useRouter();
    const { admin } = useStoreState(({ AdminStore: { admin } }) => ({
      admin,
    }));

    useEffect(() => {
      if (!admin) {
        router.push('/login');
      }
    }, [router, admin]);

    if (!admin) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return Component;
};

export default withAuth;
