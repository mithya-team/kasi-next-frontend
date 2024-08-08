import RepsView from '@/features/MetricLayouts/RepsView';
import { MetricSet } from '@/models/workout/workout-metric/workout-metric.types';

interface SetsViewProps {
  title?: string;
  sets: MetricSet[];
}

const SetsView: React.FC<SetsViewProps> = ({ title, sets }) => {
  if (!sets.length) return <></>;
  return (
    <div className='p-2'>
      {title && (
        <div className='text-white text-center font-secondary font-semibold text-2xl mb-4'>
          {title}
        </div>
      )}
      {sets.map((set) => (
        <div key={set.id} className='space-y-4 mb-4'>
          <div className='flex items-center justify-between'>
            <div className='flex-1'></div>
            <div className='text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-teal-400 text-lg font-medium'>
              {set.name}
            </div>
            <div className='flex-1'></div>
          </div>
          <RepsView reps={set.reps} />
        </div>
      ))}
    </div>
  );
};

export default SetsView;
