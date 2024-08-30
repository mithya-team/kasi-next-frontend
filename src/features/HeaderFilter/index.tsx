import { usePathname } from 'next/navigation';
import { FC, useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/Buttons';
import CheckboxInput from '@/components/CheckboxInput';
import Popover from '@/components/Popover';
import SvgIcon from '@/components/SvgIcon';

import { useStoreState } from '@/store';

import { ProductPlanId } from '@/models/user/user.types';
import { WorkoutSessionStatus } from '@/models/workout/workout.types';

interface HeaderFilterProps {
  handleCheckboxChange: (config: IConfig) => Promise<void>;
}
const HeaderFilter: FC<HeaderFilterProps> = ({ handleCheckboxChange }) => {
  const [openPopover, setOpenPopover] = useState(false);
  const pathName = usePathname();

  const isScheduleScreen = pathName.split('/')[1] === 'schedule';
  const { usersScreenFilter, scheduleFilters } = useStoreState(
    ({ filterStore: { usersScreenFilter, scheduleFilters } }) => ({
      scheduleFilters,
      usersScreenFilter,
    }),
  );

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
      containerClassName={cn('gap-0', { ['w-[17rem]']: !isScheduleScreen })}
    >
      <div
        onClick={() => setOpenPopover(!openPopover)}
        className='flex justify-center items-center'
      >
        <SvgIcon pathFill='#9CA3AF' name='down-arrow' />
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
            <div className='flex flex-row text-left gap-4 items-center px-3 h-full w-full'>
              <CheckboxInput
                checked={isChecked}
                onChange={() => handleCheckboxChange(config)}
                checkboxClassName='h-4 w-4 rounded'
              />
              <span className='font-primary font-medium text-gray-50'>
                {config.label}
              </span>
            </div>
            {idx === rowsConfig.length - 1 ? (
              <></>
            ) : (
              <div className='w-full h-[1px] my-3 opacity-20 bg-gray-1' />
            )}
          </Button>
        );
      })}
    </>
  );
};

export interface IConfig {
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
