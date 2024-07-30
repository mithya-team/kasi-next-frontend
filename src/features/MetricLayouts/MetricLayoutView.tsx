import React from 'react';

import Button from '@/components/Buttons';

import SingleMetricViewFlex from '@/features/MetricLayouts/SingleValueMetricFlex';
import {
  MetricLayout,
  MetricPresentView,
} from '@/models/workout/workout-metric/workout-metric.types';

import LapsView from './LapsView';
import RepsView from './RepsView';
import SetsView from './SetsView';

interface MetricLayoutViewProps {
  metricLayout: MetricLayout;
  buttonLabel?: string;
  buttonAction?: () => void;
}

const MetricLayoutView: React.FC<MetricLayoutViewProps> = ({
  metricLayout,
  buttonLabel,
  buttonAction = () => console.log('Lap'),
}) => {
  return (
    <div>
      <div className='p-4'>
        <div className='space-y-3'>
          <SingleMetricViewFlex
            metrics={metricLayout.metrics.filter(
              (metric: MetricPresentView) => metric.type === 'singleValue',
            )}
          />

          {metricLayout.metrics
            .filter((metric: MetricPresentView) => metric.type === 'tabular')
            .map((metric: MetricPresentView) => (
              <div key={metric.id}>
                {metric.reps && (
                  <RepsView title={metric.label} reps={metric.reps} />
                )}
                {metric.sets && (
                  <SetsView title={metric.label} sets={metric.sets} />
                )}
                {metric.laps && (
                  <LapsView title={metric.label} laps={metric.laps} />
                )}
              </div>
            ))}
        </div>

        {buttonLabel && (
          <div className='mt-4 px-2'>
            <Button variant='primary' size='sm' onClick={buttonAction}>
              {buttonLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export { MetricLayoutView };
