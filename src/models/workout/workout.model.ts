import { request } from '@/lib/axios/request';

import {
  UserWorkoutDataResponse,
  UserWorkoutSessionParams,
  WorkoutScheduleResponse,
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
    return request(`/workout-sessions/${id}`);
  },
};

export default workoutModel;
