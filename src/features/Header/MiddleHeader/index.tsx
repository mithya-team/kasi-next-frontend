import { FC } from 'react';

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
    <div className='flex flex-row gap-5'>
      {tabs.map((tab, index) => {
        const isActive = showUserWorkoutContent
          ? tab.id === 'workout'
          : tab.id === 'overview';
        return (
          <div
            key={index}
            className={`h-[54px] flex justify-center px-2  items-center rounded-lg border-b ${isActive ? 'border-white' : 'border-transparent'}`}
          >
            <button
              className={`text-sm font-medium font-primary w-full h-full ${isActive ? 'text-white' : 'text-gray-500'}`}
              onClick={() => onTabsClick?.(tab)}
            >
              {tab.name}
            </button>
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
