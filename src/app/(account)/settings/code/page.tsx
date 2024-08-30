'use client';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { toast } from '@/lib/toast';

import PrimaryButton from '@/components/Buttons/PrimaryButton';
import TertiaryButton from '@/components/Buttons/TertiaryButton';
import Typo from '@/components/typography/Typo';

import { useStoreActions, useStoreState } from '@/store';

import { ROUTE } from '@/constant/route';
import AdminCode from '@/features/AdminCode';
import ConfirmationDialog from '@/features/ConfirmationDialog';
import adminModel from '@/models/admin/admin.model';

const Code: FC = () => {
  const [openDialog, setDialogOpen] = useState(false);

  const { admin } = useStoreState(({ AdminStore: { admin } }) => ({ admin }));
  const { setAdminCode } = useStoreActions(
    ({ AdminStore: { setAdminCode } }) => ({
      setAdminCode,
    }),
  );

  const router = useRouter();

  const onRegenerateCoachCode = async () => {
    if (!admin?._id) return;
    try {
      const res = await adminModel.generateInviteCode(admin?._id);
      if (res?.code) setAdminCode(res.code);
      setDialogOpen(false);
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  };

  return (
    <div className='flex flex-col gap-9 mt-[60px] justify-center items-center mx-auto w-[25rem]'>
      <Typo
        level='h2'
        classes='text-white tracking-[-0.225px] font-semibold font-secondary text-center'
      >
        Code
      </Typo>
      <div className='flex flex-col gap-5'>
        <AdminCode className='mt-0' />
      </div>

      <div className='flex flex-row w-full gap-5'>
        <TertiaryButton onClick={() => setDialogOpen(true)}>
          Regenerate
        </TertiaryButton>
        <PrimaryButton
          type='submit'
          onClick={() => router.push(ROUTE.SETTING_ROUTE.path)}
        >
          Save
        </PrimaryButton>
      </div>
      <ConfirmationDialog
        open={openDialog}
        onClose={() => setDialogOpen(false)}
        onAgree={onRegenerateCoachCode}
      >
        <div className='flex flex-col gap-4'>
          <Typo
            level='h2'
            classes='font-secondary font-semibold text-white text-center tracking-[-0.225px]'
          >
            Are you sure!
          </Typo>
          <Typo
            level='h2'
            classes='font-secondary font-semibold text-white text-center tracking-[-0.225px]'
          >
            You want to regenerate code
          </Typo>
        </div>
      </ConfirmationDialog>
    </div>
  );
};
export default Code;
