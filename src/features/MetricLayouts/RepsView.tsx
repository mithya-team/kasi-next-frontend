import { MetricRep } from '@/models/workout/workout-metric/workout-metric.types';

interface RepsViewProps {
  title?: string;
  reps: MetricRep[];
}

const RepsView: React.FC<RepsViewProps> = ({ title, reps }) => {
  return (
    <div className='p-2 bg-gray-800 rounded-lg'>
      {title && (
        <div className='text-white font-semibold text-lg mb-2'>{title}</div>
      )}
      {reps.map((rep) => (
        <div key={rep.id} className='space-y-2'>
          <div className='flex items-center justify-between text-white text-sm mb-2'>
            <div className='flex-1'>{rep.name}</div>
            <div className='text-gray-300 text-right'>{rep.value}</div>
          </div>
          <hr className='border-gray-600' />
          {rep.laps.map((lap) => (
            <div
              key={lap.id}
              className='flex items-center justify-between text-gray-400 text-xs mb-1'
            >
              <div className='flex-1'>{lap.name}</div>
              <div>{lap.value}</div>
            </div>
          ))}
          {rep.recovery && (
            <div className='flex items-center'>
              <div className='flex-1'>
                <span className='text-gray-400 text-xs'>
                  Recovery: {rep.recovery}
                </span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RepsView;
