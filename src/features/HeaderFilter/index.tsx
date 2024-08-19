import { isAxiosError } from 'axios';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useMemo, useState } from 'react';

import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';

import Button from '@/components/Buttons';
import CheckboxInput from '@/components/CheckboxInput';
import Popover from '@/components/Popover';
import SvgIcon from '@/components/SvgIcon';

import { useStoreActions, useStoreState } from '@/store';

import { ProductPlanId } from '@/models/user/user.types';
import { WorkoutSessionStatus } from '@/models/workout/workout.types';

const HeaderFilter: FC = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const pathName = usePathname();

  const isScheduleScreen = pathName.split('/')[1] === 'schedule';
  const { usersScreenFilter, scheduleFilters } = useStoreState(
    ({ filterStore: { usersScreenFilter, scheduleFilters } }) => ({
      scheduleFilters,
      usersScreenFilter,
    }),
  );
  const {
    fetchUsersList,
    fetchWorkoutScheduleData,
    updateScheduleFilters,
    updateUsersScreenFilter,
  } = useStoreActions(
    ({
      UserStore: { fetchUsersList },
      WorkoutStore: { fetchWorkoutScheduleData },
      filterStore: { updateUsersScreenFilter, updateScheduleFilters },
    }) => ({
      fetchUsersList,
      fetchWorkoutScheduleData,
      updateScheduleFilters,
      updateUsersScreenFilter,
    }),
  );

  const handleOnClick = async () => {
    try {
      if (isScheduleScreen) {
        await fetchWorkoutScheduleData({
          status: scheduleFilters,
        });
      } else {
        await fetchUsersList({ planIds: usersScreenFilter as ProductPlanId[] });
      }
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  };

  const handleCheckboxChange = (config: IConfig) => {
    const isSelected = isScheduleScreen
      ? scheduleFilters.includes(config.id as WorkoutSessionStatus)
      : usersScreenFilter.includes(config.id as ProductPlanId);

    const newSelectedItems = isSelected
      ? (isScheduleScreen ? scheduleFilters : usersScreenFilter).filter(
          (id) => id !== config.id,
        )
      : [
          ...(isScheduleScreen ? scheduleFilters : usersScreenFilter),
          config.id,
        ];

    if (isScheduleScreen) {
      updateScheduleFilters(newSelectedItems as WorkoutSessionStatus[]);
    } else {
      updateUsersScreenFilter(newSelectedItems as ProductPlanId[]);
    }
  };

  useEffect(() => {
    handleOnClick();
  }, [scheduleFilters, usersScreenFilter]);

  return (
    <Popover
      open={openPopover}
      onOpenChange={setOpenPopover}
      content={
        <PopoverContent
          handleCheckboxChange={handleCheckboxChange}
          selectedItems={isScheduleScreen ? scheduleFilters : usersScreenFilter}
          isScheduleScreen={isScheduleScreen}
        />
      }
      containerClassName={cn({ ['w-[17rem]']: !isScheduleScreen })}
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
  handleCheckboxChange: (config: IConfig) => void;
  selectedItems: string[];
}
const PopoverContent: FC<PopoverContentProps> = ({
  isScheduleScreen,
  handleCheckboxChange,
  selectedItems,
}) => {
  const rowsConfig: IConfig[] = useMemo(
    () => getRows(isScheduleScreen),
    [isScheduleScreen],
  );

  return (
    <>
      {rowsConfig?.map((config, idx) => {
        const isChecked = selectedItems.includes(config.id);
        return (
          <Button
            key={idx}
            className='flex flex-col justify-center items-center'
            onClick={() => handleCheckboxChange(config)}
          >
            <div className='flex flex-row text-left gap-4 items-center p-2 h-full w-full'>
              <CheckboxInput
                checked={isChecked}
                onChange={() => handleCheckboxChange(config)}
                checkboxClassName='h-4 w-4 rounded'
              />
              <span className='font-primary font-medium text-gray-50'>
                {config.label}
              </span>
            </div>
            <div className='w-full h-[1px] opacity-20 bg-gray-1' />
          </Button>
        );
      })}
    </>
  );
};

interface IConfig {
  label: string;
  id: ProductPlanId | WorkoutSessionStatus;
}

const getRows = (isScheduleScreen = false): IConfig[] => {
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
    ];
  }
};
