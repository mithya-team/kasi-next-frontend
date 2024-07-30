import {
  LayoutType,
  LiveStatus,
  MetricLayout,
  MetricType,
} from '@/models/workout/workout-metric/workout-metric.types';

export const MetricTestData: MetricLayout[] = [
  {
    id: LayoutType.Layout1,
    layout: LayoutType.Layout1,
    metrics: [
      {
        id: crypto.randomUUID(),
        label: 'Time',
        value: '00:54',
        key: 'TimeElapsed',
        type: MetricType.SingleValue,
        icon: 'elapsed-time',
      },
      {
        id: crypto.randomUUID(),
        label: 'Pace',
        value: '7\'26"',
        key: 'Pace',
        type: MetricType.SingleValue,
        icon: 'pace',
      },
      {
        id: crypto.randomUUID(),
        label: 'Heart Rate',
        value: '156',
        key: 'HeartRate',
        type: MetricType.SingleValue,
        icon: 'heart-rate',
      },
      {
        id: crypto.randomUUID(),
        label: 'Laps',
        value: '',
        key: 'Laps',
        type: MetricType.Tabular,
        laps: [
          {
            id: crypto.randomUUID(),
            name: 'Lap 01',
            value: '04:00',
            status: LiveStatus.Completed,
          },
          {
            id: crypto.randomUUID(),
            name: 'Lap 02',
            value: '04:00',
            status: LiveStatus.Completed,
          },
          {
            id: crypto.randomUUID(),
            name: 'Lap 03',
            value: '02:00',
            status: LiveStatus.Pending,
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        label: 'Repetitions',
        value: '',
        key: 'Reps',
        type: MetricType.Tabular,
        reps: [
          {
            id: crypto.randomUUID(),
            name: 'Rep 01',
            value: '10:00',
            laps: [
              {
                id: crypto.randomUUID(),
                name: 'Lap 01',
                value: '04:00',
                status: LiveStatus.Completed,
              },
              {
                id: crypto.randomUUID(),
                name: 'Lap 02',
                value: '04:00',
                status: LiveStatus.Completed,
              },
              {
                id: crypto.randomUUID(),
                name: 'Lap 03',
                value: '02:00',
                status: LiveStatus.Pending,
              },
            ],
            recovery: '02:30',
            status: LiveStatus.Completed,
          },
          {
            id: crypto.randomUUID(),
            name: 'Rep 02',
            value: '10:00',
            laps: [
              {
                id: crypto.randomUUID(),
                name: 'Lap 01',
                value: '04:00',
                status: LiveStatus.Completed,
              },
              {
                id: crypto.randomUUID(),
                name: 'Lap 02',
                value: '04:00',
                status: LiveStatus.Completed,
              },
              {
                id: crypto.randomUUID(),
                name: 'Lap 03',
                value: '02:00',
                status: LiveStatus.Pending,
              },
            ],
            recovery: '02:30',
            status: LiveStatus.Pending,
          },
        ],
      },
      {
        id: crypto.randomUUID(),
        label: 'Sets',
        value: '',
        key: 'Sets',
        type: MetricType.Tabular,
        sets: [
          {
            id: crypto.randomUUID(),
            name: 'Set 01',
            reps: [
              {
                id: crypto.randomUUID(),
                name: 'Rep 01',
                value: '10:00',
                laps: [
                  {
                    id: crypto.randomUUID(),
                    name: 'Lap 01',
                    value: '04:00',
                    status: LiveStatus.Completed,
                  },
                  {
                    id: crypto.randomUUID(),
                    name: 'Lap 02',
                    value: '04:00',
                    status: LiveStatus.Completed,
                  },
                  {
                    id: crypto.randomUUID(),
                    name: 'Lap 03',
                    value: '02:00',
                    status: LiveStatus.Completed,
                  },
                ],
                recovery: '02:30',
                status: LiveStatus.Completed,
              },
              {
                id: crypto.randomUUID(),
                name: 'Rep 02',
                value: '10:00',
                laps: [
                  {
                    id: crypto.randomUUID(),
                    name: 'Lap 01',
                    value: '04:00',
                    status: LiveStatus.Completed,
                  },
                  {
                    id: crypto.randomUUID(),
                    name: 'Lap 02',
                    value: '04:00',
                    status: LiveStatus.Completed,
                  },
                  {
                    id: crypto.randomUUID(),
                    name: 'Lap 03',
                    value: '02:00',
                    status: LiveStatus.Pending,
                  },
                ],
                recovery: '02:30',
                status: LiveStatus.Completed,
              },
            ],
            recovery: '05:00',
            status: LiveStatus.Completed,
          },
          {
            id: crypto.randomUUID(),
            name: 'Set 02',
            reps: [
              {
                id: crypto.randomUUID(),
                name: 'Rep 01',
                value: '10:00',
                laps: [
                  {
                    id: crypto.randomUUID(),
                    name: 'Lap 01',
                    value: '04:00',
                    status: LiveStatus.Completed,
                  },
                  {
                    id: crypto.randomUUID(),
                    name: 'Lap 02',
                    value: '04:00',
                    status: LiveStatus.Completed,
                  },
                  {
                    id: crypto.randomUUID(),
                    name: 'Lap 03',
                    value: '02:00',
                    status: LiveStatus.Running,
                  },
                ],
                recovery: '02:30',
                status: LiveStatus.Completed,
              },
              {
                id: crypto.randomUUID(),
                name: 'Rep 02',
                value: '10:00',
                laps: [
                  {
                    id: crypto.randomUUID(),
                    name: 'Lap 01',
                    value: '04:00',
                    status: LiveStatus.Completed,
                  },
                  {
                    id: crypto.randomUUID(),
                    name: 'Lap 02',
                    value: '04:00',
                    status: LiveStatus.Completed,
                  },
                  {
                    id: crypto.randomUUID(),
                    name: 'Lap 03',
                    value: '02:00',
                    status: LiveStatus.Pending,
                  },
                ],
                recovery: '02:30',
                status: LiveStatus.Pending,
              },
            ],
            recovery: '05:00',
            status: LiveStatus.Pending,
          },
        ],
      },
    ],
  },
];
