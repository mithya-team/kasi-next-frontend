'use client';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { toast } from '@/lib/toast';

import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { useStoreActions, useStoreState } from '@/store';

import { getSettingItem } from '@/app/(account)/settings/config';
import PlanStatus from '@/app/(account)/settings/PlanStatus';
import withAuth from '@/hoc/withAuth';
import adminModel from '@/models/admin/admin.model';
import { ActiveProduct } from '@/models/admin/admin.types';

const Settings = () => {
  const { admin, adminCode, isSuperAdmin } = useStoreState(
    ({ AdminStore: { admin, adminCode, isSuperAdmin } }) => ({
      admin,
      adminCode,
      isSuperAdmin,
    }),
  );
  const { fetchAdminCode } = useStoreActions(
    ({ AdminStore: { fetchAdminCode } }) => ({
      fetchAdminCode,
    }),
  );
  const [activeSubscription, setActiveSubscription] = useState<ActiveProduct>();

  const fetchProducts = async () => {
    try {
      const activeProduct = await adminModel.getActiveProduct();
      if (activeProduct) setActiveSubscription(activeProduct[0]);
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!adminCode && admin && !isSuperAdmin) fetchAdminCode(admin?._id);
  }, [admin]);

  const settingConfig = useMemo(
    () => getSettingItem(admin, adminCode, isSuperAdmin),
    [adminCode, admin],
  );

  return (
    <div className='flex flex-col gap-9 mx-auto w-[32.5rem] items-center justify-center py-10'>
      {isSuperAdmin ? null : <PlanStatus activeProduct={activeSubscription} />}
      {settingConfig?.map((config) => {
        return (
          <Link
            key={config?.id}
            href={config.href}
            className='group bg-gradient-to-r p-[1px] flex justify-center items-center hover:from-linear-1 hover:to-linear-2 rounded-xl w-full'
          >
            <div className='relative rounded-xl border-0 bg-gray-800 text-white font-medium font-primary text-sm leading-[14px] flex flex-row justify-between items-center py-3 px-5 w-full'>
              <div className='flex flex-row justify-center items-center  gap-2.5'>
                <SvgIcon name={config.icon} />
                <Typo>{config.label}</Typo>
              </div>
              <div className='flex flex-row justify-center items-center gap-2.5 hover:plan-status'>
                <Typo classes='group-hover:plan-status'>{config?.value}</Typo>
                <SvgIcon name='right-arrow' />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default withAuth(Settings);
