import SvgIcon from '@/components/SvgIcon';
import Typo from '@/components/typography/Typo';

import { MetricPresentView } from '@/models/workout/workout-metric/workout-metric.types';

interface SingleValueViewProps {
  metric: MetricPresentView;
}

const SingleValueView: React.FC<SingleValueViewProps> = ({ metric }) => {
  return (
    <div
      className='flex flex-row items-center justify-center border-r border-gray-600 last:border-r-0'
      key={metric.key}
    >
      <div className='flex flex-col px-[30px] py-4 items-center'>
        <SvgIcon name={metric?.icon ?? 'call'} pathFill='#91E0C8' />
        <Typo level='h2' classes='font-secondary text-green-500'>
          {metric?.value}
        </Typo>
        <Typo classes='font-primary text-sm text-gray-200 uppercase '>
          {metric?.label}
        </Typo>
      </div>
    </div>
  );
};

export default SingleValueView;
