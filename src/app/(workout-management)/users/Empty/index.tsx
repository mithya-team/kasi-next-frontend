import { isAxiosError } from 'axios';
import { FC, useEffect, useState } from 'react';

import { copyToClipboard } from '@/lib/helper';
import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';

import Button from '@/components/Buttons';
import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { useStoreState } from '@/store';

import adminModel from '@/models/admin/admin.model';

const Empty: FC<{ className?: string }> = ({ className }) => {
  const [adminCode, setAdminCode] = useState<string>();

  const { admin } = useStoreState(({ AdminStore: { admin } }) => ({
    admin,
  }));

  const fetchCode = async () => {
    if (!admin) return;
    try {
      const res = await adminModel.getCodeInviteCodeById(admin?._id);
      if (res) setAdminCode(res.code);
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  };

  useEffect(() => {
    fetchCode();
  }, [admin]);

  return (
    <div
      className={cn(
        'justify-center items-center flex mt-4 flex-col gap-9 w-[22rem] mx-auto',
        className,
      )}
    >
      <SvgIcon name='empty-user-list' />
      <Typo classes='font-secondary font-semibold tracking-[-0.225px] text-white text-3xl text-center'>
        There is no one runner available for coaching.
      </Typo>

      <Typo classes='font-primary text-base text-gray-300 text-center'>
        Share the code below with your runners. This will allow them to connect
        with you.
      </Typo>
      {adminCode && (
        <div className='-mt-4 border flex flex-row gap-5 bg-gray-800 px-[50px] py-3.5 border-dashed border-gray-600'>
          <Typo
            level='h2'
            classes='text-gradient-1 tracking-[-0.225px] font-semibold'
          >{`#${adminCode}`}</Typo>
          <Button onClick={() => copyToClipboard(adminCode)}>
            <SvgIcon name='copy' />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Empty;
