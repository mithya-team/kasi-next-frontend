import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useStoreActions, useStoreState } from '@/store';

import { AuthDialogType } from '@/models/auth/auth.types';

const withAuth = (WrappedComponent: React.ComponentType) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = (props: any) => {
    const router = useRouter();
    const { admin } = useStoreState(({ AdminStore: { admin } }) => ({
      admin,
    }));
    const { openDialog } = useStoreActions(
      ({ DialogStore: { openDialog } }) => ({
        openDialog,
      }),
    );

    useEffect(() => {
      if (!admin) {
        router.push('/');
        openDialog(AuthDialogType.LOGIN);
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
