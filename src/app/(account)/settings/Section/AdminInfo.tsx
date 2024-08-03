import { FC, useEffect, useMemo } from 'react';

import Button from '@/components/Buttons';
import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { useStoreActions, useStoreState } from '@/store';

import { SettingItemConfig } from '@/app/(account)/settings/@types';
import { getSettingItem } from '@/app/(account)/settings/config';
import PlanStatus from '@/app/(account)/settings/Section/PlanStatus';

interface AdminInfoProps {
  onItemClick: (item: SettingItemConfig) => void;
}
const AdminInfo: FC<AdminInfoProps> = ({ onItemClick }) => {
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

  const settingConfig = useMemo(
    () => getSettingItem(admin, adminCode),
    [adminCode, admin],
  );

  return (
    <>
      <PlanStatus />
      {settingConfig?.map((config) => {
        return (
          <div
            key={config?.id}
            className='group bg-gradient-to-r p-[1px] flex justify-center items-center hover:from-linear-1 hover:to-linear-2 rounded-xl w-full'
          >
            <div className='relative rounded-xl border-0 bg-gray-800 text-white font-medium font-primary text-sm leading-[14px] flex flex-row justify-between items-center py-3 px-5 w-full'>
              <div className='flex flex-row justify-center items-center  gap-2.5'>
                <SvgIcon name={config.icon} />
                <Typo>{config.label}</Typo>
              </div>
              <div className='flex flex-row justify-center items-center gap-2.5 hover:plan-status'>
                <Typo classes='group-hover:plan-status'>{config?.value}</Typo>
                <Button onClick={() => onItemClick(config)}>
                  <SvgIcon name='right-arrow' />
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default AdminInfo;
