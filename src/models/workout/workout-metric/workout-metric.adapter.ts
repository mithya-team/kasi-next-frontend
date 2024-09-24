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
          label: 'Mile Splits',
          value: '00:00',
          key: 'TimeForEachMileDistance',
          type: MetricType.Tabular,
          laps: [],
        });
        break;
      case 'TimeForEachKMDistance':
        initialMetrics.push({
          id: crypto.randomUUID(),
          label: 'Kilometer Splits',
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
          label: 'Rep Times',
          value: '00:00',
          key: metric,
          type: MetricType.Tabular,
          sets: [],
        });
        break;
      case 'TimeEachRep':
        initialMetrics.push({
          id: crypto.randomUUID(),
          label: 'Rep Splits',
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
      case 'RepTimeElapsed':
        initialMetrics.push({
          id: crypto.randomUUID(),
          label: 'Rep Time',
          value: '00:00',
          key: metric,
          type: MetricType.SingleValue,
          icon: 'elapsed-time',
        });
        break;
      case 'RepDistanceElapsed':
        initialMetrics.push({
          id: crypto.randomUUID(),
          label: `Rep (Distance)`,
          value: '0.0',
          key: metric,
          type: MetricType.SingleValue,
          icon: 'elapsed-distance',
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
    workoutSession.unitLengthStats.forEach((segment, index) => {
      const segmentDuration = Math.floor(segment.elapsedDuration);
      const segmentMinutes = Math.floor(segmentDuration / 60);
      const segmentSeconds = segmentDuration % 60;
      const formattedSegmentDuration = `${segmentMinutes.toString().padStart(2, '0')}:${segmentSeconds.toString().padStart(2, '0')}`;
      const label = `KM ${index + 1}`;
      const atomicMetric: MetricLap = {
        id: crypto.randomUUID(),
        name: label,
        value: formattedSegmentDuration,
        status: LiveStatus.Completed,
      };
      children.push(atomicMetric);
    });

    const timeForEachKMMetric: MetricPresentView = {
      id: crypto.randomUUID(),
      label: 'Kilometer Splits',
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
    workoutSession.unitLengthStats.forEach((segment, index) => {
      const segmentDuration = Math.floor(segment.elapsedDuration);
      const segmentMinutes = Math.floor(segmentDuration / 60);
      const segmentSeconds = segmentDuration % 60;
      const formattedSegmentDuration = `${segmentMinutes.toString().padStart(2, '0')}:${segmentSeconds.toString().padStart(2, '0')}`;
      const label = `Mile ${index + 1}`;
      const atomicMetric: MetricLap = {
        id: crypto.randomUUID(),
        name: label,
        value: formattedSegmentDuration,
        status: LiveStatus.Completed,
      };
      children.push(atomicMetric);
    });

    const timeForEachMileMetric: MetricPresentView = {
      id: crypto.randomUUID(),
      label: 'Mile Splits',
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

        let recoveryString: string | undefined;
        if (rep.recoveryTime && rep.recoveryTime > 0) {
          const recoveryMinutes = Math.floor(rep.recoveryTime / 60);
          const recoverySeconds = Math.floor(rep.recoveryTime % 60);
          recoveryString = `${recoveryMinutes.toString().padStart(2, '0')}:${recoverySeconds.toString().padStart(2, '0')}`;
        }

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
          recovery: recoveryString,
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

      const setsLabel = 'Rep Times';
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

  const timeEachRepIndex = updatedMetricPrettified.findIndex(
    (metric) => metric.key === 'TimeEachRep',
  );
  if (timeEachRepIndex !== -1) {
    const setChildren: MetricRep[] = [];

    workoutSession.workoutData.forEach((set) => {
      let setTotalDuration = 0;

      set.reps.forEach((rep, repIndex) => {
        // const repChildren: MetricLap[] = [];
        let repTotalDuration = 0;

        rep.laps.forEach((lap) => {
          // Add to rep total duration
          repTotalDuration += lap.elapsedDuration;
        });

        // Calculate rep total duration in minutes and seconds
        const repTotalMinutes = Math.floor(repTotalDuration / 60);
        const repTotalSeconds = repTotalDuration % 60;
        const formattedRepTotalDuration = `${repTotalMinutes.toString().padStart(2, '0')}:${repTotalSeconds.toString().padStart(2, '0')}`;

        // Handling recovery time (if available)
        let recoveryString: string | undefined;
        if (rep.recoveryTime && rep.recoveryTime > 0) {
          const recoveryMinutes = Math.floor(rep.recoveryTime / 60);
          const recoverySeconds = Math.floor(rep.recoveryTime % 60);
          recoveryString = `${recoveryMinutes.toString().padStart(2, '0')}:${recoverySeconds.toString().padStart(2, '0')}`;
        }

        const repLabel = `Rep ${repIndex + 1}`;
        const repMetric: MetricRep = {
          id: crypto.randomUUID(),
          name: repLabel,
          value: formattedRepTotalDuration,
          recovery: recoveryString,
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

      const setsLabel = 'Rep Splits';
      const timeEachRepMetric: MetricPresentView = {
        id: crypto.randomUUID(),
        label: setsLabel,
        value: formattedSetTotalDuration,
        key: 'TimeEachRep',
        type: MetricType.Tabular,
        reps: setChildren,
      };
      updatedMetricPrettified[timeEachRepIndex] = timeEachRepMetric;
    });
  }

  const repTimeElapsedIndex = updatedMetricPrettified.findIndex(
    (item) => item.key === 'RepTimeElapsed',
  );

  if (repTimeElapsedIndex !== -1) {
    if (workoutSession.status === 'End') {
      // Calculate time elapsed and format it as MM:SS
      const currentTimeElapsed = workoutSession.timeElapsed;
      const minutes = Math.floor(currentTimeElapsed / 60);
      const seconds = currentTimeElapsed % 60;
      const formattedTimeElapsed = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

      // Update the value and label in updatedMetricPrettified for repTimeElapsedIndex
      updatedMetricPrettified[repTimeElapsedIndex].value = formattedTimeElapsed;
      updatedMetricPrettified[repTimeElapsedIndex].label = 'Time';
    } else {
      const currentSetIndex = workoutSession.currentSetIndex;
      const currentRepIndex = workoutSession.currentRepIndex;

      if (
        currentSetIndex !== undefined &&
        currentRepIndex !== undefined &&
        currentSetIndex < workoutSession.workoutData.length &&
        currentRepIndex <
          workoutSession.workoutData[currentSetIndex].reps.length
      ) {
        const currentRep =
          workoutSession.workoutData[currentSetIndex].reps[currentRepIndex];

        // Calculate total duration of laps
        let repTotalDuration = 0;
        for (const lap of currentRep.laps) {
          repTotalDuration += lap.elapsedDuration;
        }

        // Convert total duration to minutes and seconds
        const repTotalMinutes = Math.floor(repTotalDuration / 60);
        const repTotalSeconds = repTotalDuration % 60;
        const formattedRepTotalDuration = `${String(repTotalMinutes).padStart(2, '0')}:${String(repTotalSeconds).padStart(2, '0')}`;

        // Update the value in updatedMetricPrettified
        updatedMetricPrettified[repTimeElapsedIndex].value =
          formattedRepTotalDuration;
      } else {
        // If currentSetIndex or currentRepIndex is undefined or out of range, set default value "00:00"
        updatedMetricPrettified[repTimeElapsedIndex].value = '00:00';
      }
    }
  }

  // Find the index for "RepDistanceElapsed"
  const repDistanceElapsedIndex = updatedMetricPrettified.findIndex(
    (item) => item.key === 'RepDistanceElapsed',
  );

  if (repDistanceElapsedIndex !== -1) {
    if (workoutSession.status === 'End') {
      // Format the total distance
      const formattedDistance = workoutSession.totalDistance.toFixed(2);

      // Update the value and label in updatedMetricPrettified for repDistanceElapsedIndex
      updatedMetricPrettified[repDistanceElapsedIndex].value =
        formattedDistance;
      updatedMetricPrettified[repDistanceElapsedIndex].label =
        workoutSession.lengthUnit === 'km' ? 'KM' : 'Miles';
    } else {
      // Safely unwrap currentSetIndex, currentRepIndex, and currentRep
      const currentSetIndex = workoutSession.currentSetIndex;
      const currentRepIndex = workoutSession.currentRepIndex;

      if (
        currentSetIndex !== undefined &&
        currentRepIndex !== undefined &&
        currentSetIndex < workoutSession.workoutData.length &&
        currentRepIndex <
          workoutSession.workoutData[currentSetIndex].reps.length
      ) {
        const currentRep =
          workoutSession.workoutData[currentSetIndex].reps[currentRepIndex];

        // Calculate total distance of laps
        let repTotalDistance = 0.0;
        for (const lap of currentRep.laps) {
          repTotalDistance += lap.elapsedDistance;
        }
        const formattedDistance = repTotalDistance.toFixed(2);

        // Update the value in updatedMetricPrettified
        updatedMetricPrettified[repDistanceElapsedIndex].value =
          formattedDistance;
      } else {
        // If currentSetIndex or currentRepIndex is undefined or out of range, set default value "00:00"
        updatedMetricPrettified[repDistanceElapsedIndex].value = '0.0';
      }
    }
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
