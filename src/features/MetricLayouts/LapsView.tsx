import { MetricLap } from '@/models/workout/workout-metric/workout-metric.types';

interface LapsViewProps {
  title?: string;
  laps: MetricLap[];
}

const LapsView: React.FC<LapsViewProps> = ({ title, laps }) => {
  return (
    <div className='p-2 w-full'>
      {title && (
        <div className='text-white text-center font-secondary font-semibold text-2xl mb-2'>
          {title}
        </div>
      )}
      <div className='space-y-2 bg-gray-800 rounded-lg p-5 w-full'>
        {laps.map((lap, index) => (
          <div key={lap.name}>
            <div className='flex items-center justify-between text-white text-base'>
              <div className='flex-1'>{lap.name}</div>
              <div className='text-gray-300 text-right'>{lap.value}</div>
            </div>
            {index < laps.length - 1 && (
              <hr className='border-gray-600 my-3 opacity-60' />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LapsView;
