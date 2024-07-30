import SingleValueView from '@/features/MetricLayouts/SingleValueView';
import { MetricPresentView } from '@/models/workout/workout-metric/workout-metric.types';

interface SingleMetricViewFlexProps {
  metrics: MetricPresentView[];
}

const SingleMetricViewFlex: React.FC<SingleMetricViewFlexProps> = ({
  metrics,
}) => {
  return (
    <div className='flex gap-3'>
      {metrics.map((metric) => (
        <SingleValueView key={metric.id} metric={metric} />
      ))}
    </div>
  );
};

export default SingleMetricViewFlex;
