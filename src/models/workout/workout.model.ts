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
    const { page = 1, limit = 15, search, sort, status, isSuperAdmin } = params;
    const response = request<WorkoutScheduleResponse>(
      `/workout-sessions/${isSuperAdmin ? 'schedule-for-admin' : 'schedule'}`,
      {
        method: 'GET',
        params: {
          page,
          limit,
          search,
          sort,
          status,
        },
      },
    );
    return response;
  },

  async fetchWorkoutSessionsDetails(id: string) {
    return request<WorkoutSessionDetails>(`/workout-sessions/${id}`);
  },

  async fetchWorkoutConfig(slug: string) {
    return request<WorkoutConfigDetails>(`/workout-configs/${slug}`);
  },
};

export default workoutModel;
