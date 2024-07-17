import { User } from '@/models/user/user.types';

/* eslint-disable @typescript-eslint/no-explicit-any */
export enum WorkoutSessionStatus {
  RUNNING = 'Running',
  YET_TO_START = 'Yet to start',
  Recovery = 'Recovery',
  PAST = 'End',
}
export interface UserWorkoutSessionParams {
  userId: string;
  sort?: string;
  status?: WorkoutSessionStatus;
  page?: number;
  limit?: number;
}

export interface UserWorkoutData {
  _id: string;
  startTime: string;
  lengthUnit: string;
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
