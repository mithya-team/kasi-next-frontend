import { isAxiosError } from 'axios';
import { usePathname } from 'next/navigation';
import { FC, useMemo, useState } from 'react';

import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';

import Button from '@/components/Buttons';
import Popover from '@/components/Popover';
import SvgIcon from '@/components/SvgIcon';

import { useStoreActions } from '@/store';

import { WorkoutSessionStatus } from '@/models/workout/workout.types';

const HeaderFilter: FC = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const pathName = usePathname();

  const isScheduleScreen = pathName.split('/')[1] === 'schedule';
  const { fetchUsersList, fetchWorkoutScheduleData } = useStoreActions(
    ({
      UserStore: { fetchUsersList },
      WorkoutStore: { fetchWorkoutScheduleData },
    }) => ({
      fetchUsersList,
      fetchWorkoutScheduleData,
    }),
  );

  const closePopover = () => setOpenPopover(false);

  const handleOnClick = async (rowInfo: IConfig) => {
    if (!rowInfo) return;
    try {
      if (isScheduleScreen) {
        fetchWorkoutScheduleData({
          status: rowInfo?.id as WorkoutSessionStatus,
        });
      } else {
        fetchUsersList({ planId: rowInfo?.id });
      }
      closePopover();
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  };

  return (
    <Popover
      open={openPopover}
      onOpenChange={setOpenPopover}
      content={
        <PopoverContent
          handleOnClick={handleOnClick}
          isScheduleScreen={isScheduleScreen}
        />
      }
      containerClassName={cn({ ['w-[15rem]']: !isScheduleScreen })}
    >
      <div
        onClick={() => setOpenPopover(!openPopover)}
        className='px-[15px] w-[54px] flex justify-center items-center h-[54px] py-[18px] border-[1px] border-gray-600 rounded-xl'
      >
        <SvgIcon name='sort' />
      </div>
    </Popover>
  );
};
export default HeaderFilter;

interface PopoverContentProps {
  isScheduleScreen?: boolean;
  handleOnClick: (rowInfo: IConfig) => Promise<void>;
}
const PopoverContent: FC<PopoverContentProps> = ({
  isScheduleScreen,
  handleOnClick,
}) => {
  const rowsConfig: IConfig[] = useMemo(
    () => getRows(isScheduleScreen),
    [isScheduleScreen],
  );
  return rowsConfig?.map((config, idx) => {
    return (
      <Button
        key={idx}
        className='flex flex-col justify-center items-center'
        onClick={() => handleOnClick(config)}
      >
        <div className='flex flex-row justify-start p-2 w-full'>
          <span className='font-primary font-medium text-gray-50'>
            {config.label}
          </span>
        </div>
        <div className='w-full h-[1px] opacity-20 bg-gray-1' />
      </Button>
    );
  });
};
interface IConfig {
  label: string;
  id: string;
}
const getRows = (isScheduleScreen = false) => {
  if (isScheduleScreen) {
    return [
      {
        label: 'Live',
        id: WorkoutSessionStatus.RUNNING,
      },
      {
        label: 'Upcoming',
        id: WorkoutSessionStatus.YET_TO_START,
      },
      {
        label: 'Past',
        id: WorkoutSessionStatus.PAST,
      },
    ];
  } else {
    return [
      {
        id: 'PAID_TIER_12_MONTHS',
        label: 'Annual Subscription',
      },
      {
        label: 'Monthly Subscription',
        id: 'PAID_TIER_1_MONTH',
      },
      {
        label: 'Free Trial',
        id: 'FREE_TRIAL',
      },
    ];
  }
};
