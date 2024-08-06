import {
  LengthUnit,
  WorkoutConfigDetails,
  WorkoutSessionDetails,
} from '@/models/workout/workout.types';
import {
  LayoutType,
  LiveStatus,
  MetricLap,
  MetricLayout,
  MetricPresentView,
  MetricRep,
  MetricType,
} from '@/models/workout/workout-metric/workout-metric.types';

export function initializeMetrics(
  impMetrics?: string[],
  lengthUnit?: LengthUnit | null,
): MetricPresentView[] {
  const initialMetrics: MetricPresentView[] = [];

  if (!impMetrics || !lengthUnit) return initialMetrics;

  for (const metric of impMetrics) {
    switch (metric) {
      case 'TotalDistance':
        initialMetrics.push({
          id: crypto.randomUUID(),
          label: lengthUnit === LengthUnit.KM ? 'KM' : 'Miles',
          value: '0.0',
          key: metric,
          type: MetricType.SingleValue,
          icon: 'elapsed-distance',
        });
        break;
      case 'TimeElapsed':
        initialMetrics.push({
          id: crypto.randomUUID(),
          label: 'Time',
          value: '00:00',
          key: metric,
          type: MetricType.SingleValue,
          icon: 'elapsed-time',
        });
        break;
      case 'TimeForEachMileDistance':
        initialMetrics.push({
          id: crypto.randomUUID(),
          label: 'Time for each Mile',
          value: '00:00',
          key: 'TimeForEachMileDistance',
          type: MetricType.Tabular,
          laps: [],
        });
        break;
      case 'TimeForEachKMDistance':
        initialMetrics.push({
          id: crypto.randomUUID(),
          label: 'Time for each Kilometer',
          value: '00:00',
          key: 'TimeForEachKMDistance',
          type: MetricType.Tabular,
          laps: [],
        });
        break;
      case 'SegmentPace':
        initialMetrics.push({
          id: crypto.randomUUID(),
          label: 'Segment Pace',
          value: '00:00',
          key: metric,
          type: MetricType.Tabular,
          laps: [],
        });
        break;
      case 'SegmentTime':
        initialMetrics.push({
          id: crypto.randomUUID(),
          label: 'Time for each Segment',
          value: '00:00',
          key: metric,
          type: MetricType.Tabular,
          laps: [],
        });
        break;
      case 'TimeEachLap':
        initialMetrics.push({
          id: crypto.randomUUID(),
          label: 'Workout Time',
          value: '00:00',
          key: metric,
          type: MetricType.Tabular,
          sets: [],
        });
        break;
      case 'Pace':
        initialMetrics.push({
          id: crypto.randomUUID(),
          label: 'Average Pace',
          value: '00:00',
          key: metric,
          type: MetricType.SingleValue,
          icon: 'pace',
        });
        break;
      case 'HeartRate':
        initialMetrics.push({
          id: crypto.randomUUID(),
          label: 'Heart Rate',
          value: '00',
          key: metric,
          type: MetricType.SingleValue,
          icon: 'heart-rate',
        });
        break;
      default:
        break;
    }
  }

  return initialMetrics;
}

export function updateMetricPrettified(
  workoutSession?: WorkoutSessionDetails | null,
  metricPrettified?: MetricPresentView[],
): MetricPresentView[] {
  if (!metricPrettified) {
    return [];
  }
  if (!workoutSession) {
    return metricPrettified;
  }

  const updatedMetricPrettified = [...metricPrettified];

  const heartRateIndex = updatedMetricPrettified.findIndex(
    (metric) => metric.key === 'HeartRate',
  );
  if (heartRateIndex !== -1) {
    let formattedHeartRate = '0';
    const { currentSetIndex, currentRepIndex, currentLapIndex } =
      workoutSession;
    if (
      currentSetIndex !== undefined &&
      currentRepIndex !== undefined &&
      currentLapIndex !== undefined
    ) {
      const heartRate =
        workoutSession.workoutData[currentSetIndex].reps[currentRepIndex].laps[
          currentLapIndex
        ].sessions.slice(-1)[0]?.heartRate;
      formattedHeartRate = String(heartRate ?? 0);
    }
    updatedMetricPrettified[heartRateIndex].value = formattedHeartRate;
  }

  const totalDistanceIndex = updatedMetricPrettified.findIndex(
    (metric) => metric.key === 'TotalDistance',
  );
  if (totalDistanceIndex !== -1) {
    const formattedDistance = workoutSession.totalDistance.toFixed(2);
    updatedMetricPrettified[totalDistanceIndex].value = formattedDistance;
  }

  const timeElapsedIndex = updatedMetricPrettified.findIndex(
    (metric) => metric.key === 'TimeElapsed',
  );
  if (timeElapsedIndex !== -1) {
    const currentTimeElapsed = workoutSession.timeElapsed;
    const minutes = Math.floor(currentTimeElapsed / 60);
    const seconds = currentTimeElapsed % 60;
    const formattedTimeElapsed = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    updatedMetricPrettified[timeElapsedIndex].value = formattedTimeElapsed;
  }

  // Add logic for other metrics here
  const timeForEachKMIndex = updatedMetricPrettified.findIndex(
    (metric) => metric.key === 'TimeForEachKMDistance',
  );
  if (timeForEachKMIndex !== -1) {
    const children: MetricLap[] = [];
    let currentSegmentLengthSum = 0.0;
    let currentSegmentDurationSum = 0;
    let kmCount = 0;

    for (const segment of workoutSession.segmentDurations) {
      currentSegmentLengthSum += workoutSession.segmentLength;
      currentSegmentDurationSum += segment.elapsedDuration;

      if (Math.abs(currentSegmentLengthSum - 1) < 0.0001) {
        const segmentMinutes = Math.floor(currentSegmentDurationSum / 60);
        const segmentSeconds = currentSegmentDurationSum % 60;
        kmCount++;

        const formattedSegmentDuration = `${segmentMinutes.toString().padStart(2, '0')}:${segmentSeconds.toString().padStart(2, '0')}`;
        const label = `KM ${kmCount}`;
        const atomicMetric: MetricLap = {
          id: crypto.randomUUID(),
          name: label,
          value: formattedSegmentDuration,
          status: LiveStatus.Completed,
        };
        children.push(atomicMetric);

        currentSegmentLengthSum = 0.0;
        currentSegmentDurationSum = 0;
      }
    }

    if (currentSegmentLengthSum > 0) {
      const segmentMinutes = Math.floor(currentSegmentDurationSum / 60);
      const segmentSeconds = currentSegmentDurationSum % 60;

      const formattedSegmentDuration = `${segmentMinutes.toString().padStart(2, '0')}:${segmentSeconds.toString().padStart(2, '0')}`;
      const label = `KM ${kmCount}`;
      const atomicMetric: MetricLap = {
        id: crypto.randomUUID(),
        name: label,
        value: formattedSegmentDuration,
        status: LiveStatus.Running,
      };
      children.push(atomicMetric);
    }

    const timeForEachKMMetric: MetricPresentView = {
      id: crypto.randomUUID(),
      label: 'Time for each Kilometer',
      value: '',
      key: 'TimeForEachKMDistance',
      type: MetricType.Tabular,
      laps: children,
    };

    updatedMetricPrettified[timeForEachKMIndex] = timeForEachKMMetric;
  }

  const timeForEachMileIndex = updatedMetricPrettified.findIndex(
    (metric) => metric.key === 'TimeForEachMileDistance',
  );
  if (timeForEachMileIndex !== -1) {
    const children: MetricLap[] = [];
    let currentSegmentLengthSum = 0.0;
    let currentSegmentDurationSum = 0;
    let mileCount = 0;

    for (const segment of workoutSession.segmentDurations) {
      currentSegmentLengthSum += workoutSession.segmentLength;
      currentSegmentDurationSum += segment.elapsedDuration;

      if (Math.abs(currentSegmentLengthSum - 1) < 0.0001) {
        const segmentMinutes = Math.floor(currentSegmentDurationSum / 60);
        const segmentSeconds = currentSegmentDurationSum % 60;
        mileCount++;

        const formattedSegmentDuration = `${segmentMinutes.toString().padStart(2, '0')}:${segmentSeconds.toString().padStart(2, '0')}`;
        const label = `Mile ${mileCount}`;
        const atomicMetric: MetricLap = {
          id: crypto.randomUUID(),
          name: label,
          value: formattedSegmentDuration,
          status: LiveStatus.Completed,
        };
        children.push(atomicMetric);

        currentSegmentLengthSum = 0.0;
        currentSegmentDurationSum = 0;
      }
    }

    if (currentSegmentLengthSum > 0) {
      const segmentMinutes = Math.floor(currentSegmentDurationSum / 60);
      const segmentSeconds = currentSegmentDurationSum % 60;

      const formattedSegmentDuration = `${segmentMinutes.toString().padStart(2, '0')}:${segmentSeconds.toString().padStart(2, '0')}`;
      const label = `Mile ${mileCount}`;
      const atomicMetric: MetricLap = {
        id: crypto.randomUUID(),
        name: label,
        value: formattedSegmentDuration,
        status: LiveStatus.Running,
      };
      children.push(atomicMetric);
    }

    const timeForEachMileMetric: MetricPresentView = {
      id: crypto.randomUUID(),
      label: 'Time for each Mile',
      value: '',
      key: 'TimeForEachMileDistance',
      type: MetricType.Tabular,
      laps: children,
    };

    updatedMetricPrettified[timeForEachMileIndex] = timeForEachMileMetric;
  }

  const segmentPaceIndex = updatedMetricPrettified.findIndex(
    (metric) => metric.key === 'SegmentPace',
  );
  if (segmentPaceIndex !== -1) {
    const _ = workoutSession.lengthUnit === LengthUnit.KM ? 'KM' : 'Mile';
    const children: MetricLap[] = [];
    workoutSession.segmentDurations.forEach((segment, index) => {
      const segmentPace = Math.floor(segment.pace);
      const segmentMinutes = Math.floor(segmentPace / 60);
      const segmentSeconds = segmentPace % 60;
      const formattedSegmentDuration = `${segmentMinutes.toString().padStart(2, '0')}:${segmentSeconds.toString().padStart(2, '0')}`;
      const label = `Segment ${index + 1}`;
      const atomicMetric: MetricLap = {
        id: crypto.randomUUID(),
        name: label,
        value: formattedSegmentDuration,
        status: LiveStatus.Completed,
      };
      children.push(atomicMetric);
    });
    const segmentPaceMetric: MetricPresentView = {
      id: crypto.randomUUID(),
      label: 'Segment Pace',
      value: '',
      key: 'SegmentPace',
      type: MetricType.Tabular,
      laps: children,
    };
    updatedMetricPrettified[segmentPaceIndex] = segmentPaceMetric;
  }

  const segmentTimeIndex = updatedMetricPrettified.findIndex(
    (metric) => metric.key === 'SegmentTime',
  );
  if (segmentTimeIndex !== -1) {
    const _ = workoutSession.lengthUnit === LengthUnit.KM ? 'KM' : 'Mile';
    const children: MetricLap[] = [];
    workoutSession.segmentDurations.forEach((segment, index) => {
      const segmentMinutes = Math.floor(segment.elapsedDuration / 60);
      const segmentSeconds = segment.elapsedDuration % 60;
      const formattedSegmentDuration = `${segmentMinutes.toString().padStart(2, '0')}:${segmentSeconds.toString().padStart(2, '0')}`;
      const label = `Segment ${index + 1}`;
      const atomicMetric: MetricLap = {
        id: crypto.randomUUID(),
        name: label,
        value: formattedSegmentDuration,
        status: LiveStatus.Completed,
      };
      children.push(atomicMetric);
    });
    const segmentTimeMetric: MetricPresentView = {
      id: crypto.randomUUID(),
      label: 'Time for each segment',
      value: '',
      key: 'SegmentTime',
      type: MetricType.Tabular,
      laps: children,
    };
    updatedMetricPrettified[segmentTimeIndex] = segmentTimeMetric;
  }

  const paceIndex = updatedMetricPrettified.findIndex(
    (metric) => metric.key === 'Pace',
  );
  if (paceIndex !== -1) {
    const currentTimeElapsed = workoutSession.timeElapsed;
    const distance = workoutSession.totalDistance;
    let formattedPace = '00:00';

    if (distance > 0) {
      const pace = Math.floor(currentTimeElapsed / distance);
      const minutes = Math.floor(pace / 60);
      const seconds = pace % 60;
      formattedPace = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      // Handle the case when distance is 0
      formattedPace = '00:00';
    }

    updatedMetricPrettified[paceIndex].value = formattedPace;
  }

  const timeEachLapIndex = updatedMetricPrettified.findIndex(
    (metric) => metric.key === 'TimeEachLap',
  );
  if (timeEachLapIndex !== -1) {
    const setChildren: MetricRep[] = [];

    workoutSession.workoutData.forEach((set) => {
      let setTotalDuration = 0;

      set.reps.forEach((rep, repIndex) => {
        const repChildren: MetricLap[] = [];
        let repTotalDuration = 0;

        rep.laps.forEach((lap, lapIndex) => {
          const segmentMinutes = Math.floor(lap.elapsedDuration / 60);
          const segmentSeconds = lap.elapsedDuration % 60;
          const formattedSegmentDuration = `${segmentMinutes.toString().padStart(2, '0')}:${segmentSeconds.toString().padStart(2, '0')}`;
          const label = `Lap ${lapIndex + 1}`;
          const atomicMetric: MetricLap = {
            id: crypto.randomUUID(),
            name: label,
            value: formattedSegmentDuration,
            status: LiveStatus.Completed,
          };
          repChildren.push(atomicMetric);

          // Add to rep total duration
          repTotalDuration += lap.elapsedDuration;
        });

        // Calculate rep total duration in minutes and seconds
        const repTotalMinutes = Math.floor(repTotalDuration / 60);
        const repTotalSeconds = repTotalDuration % 60;
        const formattedRepTotalDuration = `${repTotalMinutes.toString().padStart(2, '0')}:${repTotalSeconds.toString().padStart(2, '0')}`;

        const repLabel = `Rep ${repIndex + 1}`;
        const repMetric: MetricRep = {
          id: crypto.randomUUID(),
          name: repLabel,
          value: formattedRepTotalDuration,
          laps: repChildren,
          status: LiveStatus.Completed,
        };
        setChildren.push(repMetric);

        // Add to set total duration
        setTotalDuration += repTotalDuration;
      });

      // Calculate set total duration in minutes and seconds
      const setTotalMinutes = Math.floor(setTotalDuration / 60);
      const setTotalSeconds = setTotalDuration % 60;
      const formattedSetTotalDuration = `${setTotalMinutes.toString().padStart(2, '0')}:${setTotalSeconds.toString().padStart(2, '0')}`;

      const setsLabel = 'Workout Time';
      const timeForEachKMMetric: MetricPresentView = {
        id: crypto.randomUUID(),
        label: setsLabel,
        value: formattedSetTotalDuration,
        key: 'TimeEachLap',
        type: MetricType.Tabular,
        reps: setChildren,
      };
      updatedMetricPrettified[timeEachLapIndex] = timeForEachKMMetric;
    });
  }

  return updatedMetricPrettified;
}

export function getMetricLayouts(
  workoutConfig: WorkoutConfigDetails | null,
  workoutSession?: WorkoutSessionDetails | null,
  prettifiedMetric?: MetricPresentView[] | null,
): MetricLayout[] {
  const metricLayouts: MetricLayout[] = [];
  let metrics: MetricPresentView[] = [];

  if (!workoutConfig || !workoutSession || !prettifiedMetric) return [];

  if (workoutConfig.layouts.length > 0) {
    const lastLayoutInfo =
      workoutConfig.layouts[workoutConfig.layouts.length - 1];

    // Choose metrics based on the nature of the workout session
    if (workoutSession.nature === 'lap') {
      metrics = lastLayoutInfo.lap.map((lapKey) =>
        findMetric(lapKey, prettifiedMetric),
      );
    } else if (workoutSession.nature === 'interval') {
      metrics = lastLayoutInfo.interval.map((intervalKey) =>
        findMetric(intervalKey, prettifiedMetric),
      );
    }

    const layoutType = `layout${workoutConfig.layouts.length}` as LayoutType;
    const metricLayout: MetricLayout = {
      id: layoutType,
      layout: layoutType,
      metrics: metrics,
    };
    metricLayouts.push(metricLayout);
  }

  return metricLayouts;
}

function findMetric(
  key: string,
  metricPrettified: MetricPresentView[],
): MetricPresentView {
  const metric = metricPrettified.find((m) => m.key === key);

  if (metric) {
    return metric;
  } else {
    // Default metric if not found
    return {
      id: crypto.randomUUID(),
      label: 'Unknown',
      value: 'Unknown',
      key: key,
      type: MetricType.SingleValue,
    };
  }
}
