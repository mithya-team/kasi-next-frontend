import { MetricRep } from '@/models/workout/workout-metric/workout-metric.types';

interface RepsViewProps {
  title?: string;
  reps: MetricRep[];
}

const RepsView: React.FC<RepsViewProps> = ({ title, reps }) => {
  return (
    <div className=''>
      {title && (
        <div className='text-white text-center font-secondary font-semibold text-2xl mb-2'>
          {title}
        </div>
      )}
      {reps.map((rep) => (
        <div key={rep.id} className='space-y-2 p-5 bg-gray-800 rounded-lg mb-5'>
          <div className='flex flex-col items-center justify-between text-white text-sm'>
            <div className='flex flex-row w-full justify-between items-center'>
              <div className=''>{rep.name}</div>
              <div className='text-gray-300 text-right'>{rep.value}</div>
            </div>
            <hr className='border-gray-600 w-full my-4' />
          </div>
          {rep.laps.map((lap, idx) => (
            <div
              key={lap.id}
              className='flex flex-col items-center justify-between text-gray-500 text-xs'
            >
              <div className='flex flex-row w-full justify-between'>
                <div className='flex-1'>{lap.name}</div>
                <div>{lap.value}</div>
              </div>

              {idx < rep?.laps.length - 1 && (
                <hr className='border-gray-600 my-3 opacity-60 w-full' />
              )}
            </div>
          ))}
          {rep.recovery && (
            <div className='flex items-center'>
              <div className='flex-1 flex justify-center'>
                <span className='text-white text-xs text-center'>
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
