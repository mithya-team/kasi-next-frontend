import { cn } from '@/lib/utils';

import SingleValueView from '@/features/MetricLayouts/SingleValueView';
import { MetricPresentView } from '@/models/workout/workout-metric/workout-metric.types';

interface SingleMetricViewFlexProps {
  metrics: MetricPresentView[];
  className?: string;
}

const SingleMetricViewFlex: React.FC<SingleMetricViewFlexProps> = ({
  metrics,
  className,
}) => {
  return (
    <div className={cn('flex gap-3', className)}>
      {metrics.map((metric) => (
        <SingleValueView key={metric.id} metric={metric} />
      ))}
    </div>
  );
};

export default SingleMetricViewFlex;
