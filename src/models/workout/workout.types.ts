import { ICoachConnections, User } from '@/models/user/user.types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum WorkoutSessionStatus {
  RUNNING = 'Running',
  YET_TO_START = 'Yet to start',
  Recovery = 'Recovery',
  PAST = 'End',
  CANCELLED = 'Cancelled',
}
export interface UserWorkoutSessionParams {
  userId: string;
  sort?: string;
  status?: WorkoutSessionStatus[];
  page?: number;
  limit?: number;
  search?: string;
  isSuperAdmin?: boolean;
}
export enum LengthUnit {
  KM = 'km',
  MILES = 'miles',
}

export interface UserWorkoutData {
  _id: string;
  startTime: string;
  lengthUnit: LengthUnit;
  sets: WorkoutSet[];
  currentSetIndex: number;
  currentRepIndex: number;
  currentLapIndex: number;
  nature: string;
  status: WorkoutSessionStatus;
  recoveryStartTimes: any[];
  recoveryEndTimes: any[];
  totalDistance: number;
  timeElapsed: number;
  segmentLength: number;
  totalLapDistance: number;
  userId: string;
  workoutSlug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  workoutConfig: WorkoutConfig;
  endTime?: string;
  coachConnections?: ICoachConnections;
}
export interface UserWorkoutDataResponse {
  data: UserWorkoutData[];
  totalCount: number;
  page: number;
}

export interface WorkoutScheduleData extends UserWorkoutData {
  user: User | null;
}

export interface WorkoutScheduleResponse {
  data: WorkoutScheduleData[];
  totalCount: number;
  page: number;
}
interface WorkoutSet {
  recoveryTime: number;
  reps: Rep[];
}

interface Rep {
  laps: number[];
}

interface WorkoutConfig {
  _id: string;
  name: string;
  slug: string;
}

interface Session {
  timestamp: string;
  currentPace: number;
  heartRate: number;
  currentDistance: number;
  durationElapsed: number;
}

export interface LapDetails {
  startTime: string;
  averagePace: number;
  sessions: Session[];
  endTime: string;
  elapsedDuration: number;
  averageHeartRate: number;
  elapsedDistance: number;
  recoveryTime: number;
}

export interface RepDetails {
  averagePace: number;
  elapsedDuration: number;
  elapsedDistance: number;
  recoveryTime?: number;
  laps: LapDetails[];
}

interface WorkoutData {
  elapsedDuration: number;
  elapsedDistance: number;
  reps: RepDetails[];
  averagePace: number;
}

export interface SegmentDuration {
  pace: number;
  elapsedDuration: number;
  totalDurationAtStart: number;
  segment: number;
  startTime: string;
  endTime?: string;
}

export type TWorkoutNature = 'lap' | 'interval';

export interface WorkoutSessionDetails {
  _id: string;
  startTime: string;
  lengthUnit: LengthUnit;
  workoutData: WorkoutData[];
  sets: WorkoutSet[];
  currentSetIndex: number;
  currentRepIndex: number;
  currentLapIndex: number;
  nature: TWorkoutNature;
  status: string;
  recoveryStartTimes: string[];
  recoveryEndTimes: string[];
  totalDistance: number;
  timeElapsed: number;
  segmentLength: number;
  segmentDurations: SegmentDuration[];
  unitLengthStats: SegmentDuration[];
  totalLapDistance: number;
  userId: string;
  workoutSlug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  endTime: string;
  workoutConfig: WorkoutConfig;
}

export type ImpMetrices =
  | 'TotalDistance'
  | 'TimeElapsed'
  | 'TimeForEachMileDistance'
  | 'TimeForEachKMDistance'
  | 'SegmentPace'
  | 'SegmentTime'
  | 'TimeEachLap'
  | 'Pace'
  | 'HeartRate';

export interface WorkoutConfigDetails {
  _id: string;
  name: string;
  superCategory: string;
  lengthUnit: LengthUnit;
  selection: {
    nature: SelectionOption;
    lapDistance: SelectionOption;
    timeInterval: SelectionOption;
    recoveryTime: SelectionOption;
    repDistance: SelectionOption;
    repInterval: SelectionOption;
  };
  limits: {
    maxLapsInRep: number;
    maxRepsInSet: number;
    maxSet: number;
  };
  impMetrics: ImpMetrices[];
  layouts: Array<{
    lap: string[];
    interval: string[];
  }>;
  segmentLength: string;
  slug: string;
  voiceDescription: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}

export interface SelectionOption {
  mode: string;
  fixedValue: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  array?: string[];
  locked: boolean;
}
