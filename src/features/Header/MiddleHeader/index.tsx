import { FC } from 'react';

import { cn } from '@/lib/utils';

import Button from '@/components/Buttons';

import { useStoreState } from '@/store';

export interface ITabs {
  name: string;
  id: string;
}

interface MiddleHeaderProps {
  onTabsClick?: (tabs: ITabs) => void;
}

const MiddleHeader: FC<MiddleHeaderProps> = ({ onTabsClick }) => {
  const showUserWorkoutContent = useStoreState(
    (state) => state.UserStore.showUserWorkoutContent,
  );

  return (
    <div className='flex flex-start gap-5 py-2.5'>
      {tabs.map((tab, index) => {
        const isActive = showUserWorkoutContent
          ? tab.id === 'workout'
          : tab.id === 'overview';
        return (
          <div
            key={index}
            className={cn(
              'flex flex-col justify-center px-1 border-b-2 py-3 border-transparent  items-center',
              {
                ['border-white']: isActive,
              },
            )}
          >
            <Button
              className={cn(
                'text-sm font-medium w-full h-full capitalize font-primary text-gray-500',
                { ['text-white']: isActive },
              )}
              onClick={() => onTabsClick?.(tab)}
            >
              {tab.name}
            </Button>
          </div>
        );
      })}
    </div>
  );
};

const tabs: ITabs[] = [
  {
    name: 'overview',
    id: 'overview',
  },
  {
    name: 'workout',
    id: 'workout',
  },
];

export default MiddleHeader;
