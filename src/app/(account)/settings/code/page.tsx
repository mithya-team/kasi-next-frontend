'use client';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { toast } from '@/lib/toast';
import useAsyncTask from '@/hooks/useAsyncTask';

import PrimaryButton from '@/components/Buttons/PrimaryButton';
import TertiaryButton from '@/components/Buttons/TertiaryButton';
import Typo from '@/components/typography/Typo';

import { useStoreActions, useStoreState } from '@/store';

import { ROUTE } from '@/constant/route';
import AdminCode from '@/features/AdminCode';
import adminModel from '@/models/admin/admin.model';

const Code: FC = () => {
  const { admin } = useStoreState(({ AdminStore: { admin } }) => ({ admin }));
  const { setAdminCode } = useStoreActions(
    ({ AdminStore: { setAdminCode } }) => ({
      setAdminCode,
    }),
  );

  const router = useRouter();

  const onRegenerateCoachCode = useAsyncTask(async () => {
    if (!admin?._id) return;
    try {
      const res = await adminModel.generateInviteCode(admin?._id);
      if (res?.code) setAdminCode(res.code);
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  });

  return (
    <div className='flex flex-col gap-9 mt-[60px] justify-center items-center mx-auto w-[25rem]'>
      <Typo
        level='h2'
        classes='text-white tracking-[-0.225px] font-semibold font-secondary text-center'
      >
        Code
      </Typo>
      <div className='flex flex-col gap-5'>
        <Typo classes='font-primary text-base text-gray-300 text-center '>
          Your new code is...
        </Typo>
        <AdminCode className='mt-0' />
      </div>

      <div className='flex flex-row w-full gap-5'>
        <TertiaryButton
          onClick={() => onRegenerateCoachCode.run()}
          isLoading={onRegenerateCoachCode.isLoading}
        >
          Regenerator
        </TertiaryButton>
        <PrimaryButton
          type='submit'
          onClick={() => router.push(ROUTE.SETTING_ROUTE.path)}
        >
          Save
        </PrimaryButton>
      </div>
    </div>
  );
};
export default Code;
