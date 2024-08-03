import { MetricLap } from '@/models/workout/workout-metric/workout-metric.types';

interface LapsViewProps {
  title?: string;
  laps: MetricLap[];
}

const LapsView: React.FC<LapsViewProps> = ({ title, laps }) => {
  return (
    <div className='p-2'>
      {title && (
        <div className='text-white font-semibold text-lg mb-2'>{title}</div>
      )}
      <div className='space-y-2 bg-gray-800 rounded-lg'>
        {laps.map((lap) => (
          <div key={lap.name}>
            <div className='flex items-center justify-between text-white text-base'>
              <div className='flex-1'>{lap.name}</div>
              <div className='text-gray-300 text-right'>{lap.value}</div>
            </div>
            <hr className='border-gray-600 mt-2' />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LapsView;
