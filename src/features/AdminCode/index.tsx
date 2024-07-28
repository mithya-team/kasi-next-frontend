import { FC, useEffect } from 'react';

import { copyToClipboard } from '@/lib/helper';
import { cn } from '@/lib/utils';

import Button from '@/components/Buttons';
import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { useStoreActions, useStoreState } from '@/store';

const AdminCode: FC<{ className?: string }> = ({ className }) => {
  const { admin, adminCode } = useStoreState(
    ({ AdminStore: { admin, adminCode } }) => ({
      admin,
      adminCode,
    }),
  );
  const { fetchAdminCode } = useStoreActions(
    ({ AdminStore: { fetchAdminCode } }) => ({
      fetchAdminCode,
    }),
  );

  useEffect(() => {
    if (!adminCode && admin) fetchAdminCode(admin?._id);
  }, [admin]);

  if (!adminCode) return <></>;

  return (
    <div
      className={cn(
        '-mt-4 border flex flex-row gap-5 bg-gray-800 px-[50px] py-3.5 border-dashed border-gray-600',
        className,
      )}
    >
      <Typo
        level='h2'
        classes='text-gradient-1 tracking-[-0.225px] font-semibold'
      >{`#${adminCode}`}</Typo>
      <Button onClick={() => copyToClipboard(adminCode)}>
        <SvgIcon name='copy' />
      </Button>
    </div>
  );
};

export default AdminCode;
