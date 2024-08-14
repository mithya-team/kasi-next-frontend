import { isAxiosError } from 'axios';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useMemo, useState } from 'react';

import { toast } from '@/lib/toast';
import { cn } from '@/lib/utils';

import Button from '@/components/Buttons';
import Popover from '@/components/Popover';
import SvgIcon from '@/components/SvgIcon';

import { useStoreActions, useStoreState } from '@/store';

import { ProductPlanId } from '@/models/user/user.types';
import { WorkoutSessionStatus } from '@/models/workout/workout.types';

const HeaderFilter: FC = () => {
  const [openPopover, setOpenPopover] = useState(false);
  const pathName = usePathname();

  const isScheduleScreen = pathName.split('/')[1] === 'schedule';
  const { selectedFilters } = useStoreState(
    ({ filterStore: { selectedFilters } }) => ({ selectedFilters }),
  );
  const { fetchUsersList, fetchWorkoutScheduleData, updateSelectedFilter } =
    useStoreActions(
      ({
        UserStore: { fetchUsersList },
        WorkoutStore: { fetchWorkoutScheduleData },
        filterStore: { updateSelectedFilter },
      }) => ({
        fetchUsersList,
        fetchWorkoutScheduleData,
        updateSelectedFilter,
      }),
    );

  const handleOnClick = async () => {
    try {
      if (isScheduleScreen) {
        await fetchWorkoutScheduleData({
          status: selectedFilters as WorkoutSessionStatus[],
        });
      } else {
        await fetchUsersList({ planId: selectedFilters as ProductPlanId[] });
      }
    } catch (error) {
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || 'Try Again');
    }
  };

  const handleCheckboxChange = (config: IConfig) => {
    const isSelected = selectedFilters.includes(config.id);
    const newSelectedItems = isSelected
      ? selectedFilters.filter((id) => id !== (config.id as ProductPlanId))
      : [...selectedFilters, config.id];
    updateSelectedFilter(newSelectedItems);
  };

  useEffect(() => {
    handleOnClick();
  }, [selectedFilters]);

  useEffect(() => {
    updateSelectedFilter([]);
  }, [pathName]);

  return (
    <Popover
      open={openPopover}
      onOpenChange={setOpenPopover}
      content={
        <PopoverContent
          handleCheckboxChange={handleCheckboxChange}
          selectedItems={selectedFilters}
          isScheduleScreen={isScheduleScreen}
        />
      }
      containerClassName={cn({ ['w-[20rem]']: !isScheduleScreen })}
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
            <div className='flex flex-row justify-between p-2 w-full'>
              <span className='font-primary font-medium text-gray-50'>
                {config.label}
              </span>
              <input
                type='checkbox'
                checked={isChecked}
                onChange={() => handleCheckboxChange(config)}
                className='form-checkbox h-4 w-4 text-green-500 rounded transition duration-150 ease-in-out '
              />
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
        id: 'PAID_TIER_6_MONTHS',
        label: 'Half yearly Subscription',
      },
      {
        label: 'Monthly Subscription',
        id: 'PAID_TIER_1_MONTH',
      },
      {
        label: 'Free Trial',
        id: 'FREE_TIER',
      },
    ];
  }
};
