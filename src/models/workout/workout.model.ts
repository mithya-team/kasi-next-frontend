import { request } from '@/lib/axios/request';

import {
  UserWorkoutDataResponse,
  UserWorkoutSessionParams,
  WorkoutConfigDetails,
  WorkoutScheduleResponse,
  WorkoutSessionDetails,
} from '@/models/workout/workout.types';

const workoutModel = {
  async fetchUserWorkoutSessionInfoById(params: UserWorkoutSessionParams) {
    return request<UserWorkoutDataResponse>('/workout-sessions', {
      params,
    });
  },

  async fetchWorkoutSchedule(params: Omit<UserWorkoutSessionParams, 'userId'>) {
    return request<WorkoutScheduleResponse>('/workout-sessions/schedule', {
      params,
    });
  },

  async fetchWorkoutSessionsDetails(id: string) {
    return request<WorkoutSessionDetails>(`/workout-sessions/${id}`);
  },

  async fetchWorkoutConfig(slug: string) {
    return request<WorkoutConfigDetails>(`/workout-configs/${slug}`);
  },
};

export default workoutModel;
