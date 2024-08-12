import { FC } from 'react';

import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

interface LiveTrackerProps {
  totalDistance: number; // Total distance of the path
  coveredDistance: number; // Distance covered so far
  rep: number; // Current Rep
  lap: number; // Current Lap
}

const LiveTracker: FC<LiveTrackerProps> = ({
  totalDistance,
  coveredDistance,
  rep,
  lap,
}) => {
  const progressPercentage = (coveredDistance / totalDistance) * 100;

  // Adjusted calculation for elliptical path with correct starting point and direction
  const runningIconPosition = () => {
    const radians = (progressPercentage / 100) * 2 * Math.PI - Math.PI / 2;

    const x = 50 + 45 * Math.cos(radians); // 50% is the center, 45% is the ellipse radius
    const y = 50 + 85 * Math.sin(radians); // 50% is the center, 85% is the ellipse height adjustment

    return {
      top: `${y}%`,
      left: `${x}%`,
      transform: 'translate(-50%, -50%)',
    };
  };

  return (
    <div className='bg-gray-800 rounded-xl h-full py-[72px] px-5 flex justify-center items-center'>
      <div className='relative w-[12rem] h-[22rem] flex flex-col justify-between'>
        {/* Track background */}
        <div className='absolute inset-0 border-4 rounded-[13rem] border-gray-500' />

        {/* Progress (covered part) */}
        <div
          className='absolute inset-0 border-4 rounded-[13rem] border-white'
          style={{
            clipPath:
              progressPercentage <= 50
                ? `polygon(100% 50%, 50% ${100 - progressPercentage * 4}%, 100% ${100 - progressPercentage * 4}%, 100% 100%, 0% 100%, 0% 0%, 50% 0%)`
                : `polygon(100% 50%, 50% 0%, ${100 - (progressPercentage - 25) * 4}% 0%, 100% 0%, 100% 100%, 50% 100%)`,
          }}
        ></div>

        {/* Running icon attached to the end of the progress line */}
        <div
          className='absolute flex justify-center items-center'
          style={runningIconPosition()}
        >
          <div className='bg-gray-700 p-2 rounded-full'>
            <SvgIcon name='live-run' />
          </div>
        </div>

        {/* Start flag */}
        <div className='absolute right-[78px] top-1/2 transform translate-x-full -translate-y-1/2 flex items-center space-x-1'>
          <SvgIcon name='flag' />
          <span className='text-white'>Start</span>
          <div className='h-[1px] bg-white w-8'></div>{' '}
          {/* Horizontal white line */}
        </div>

        {/* Centered Rep and Lap info */}
        <div className='absolute font-secondary font-semibold translate-[-0.144px] inset-0 text-green-400 flex flex-col justify-center items-center'>
          <Typo level='h3'>{`Rep ${rep}`}</Typo>
          <Typo level='h3'>{`Lap ${lap}`}</Typo>
        </div>
      </div>
    </div>
  );
};

export default LiveTracker;
