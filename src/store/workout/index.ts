import { Action, action, Thunk, thunk } from 'easy-peasy';

import workoutModel from '@/models/workout/workout.model';
import {
  UserWorkoutData,
  UserWorkoutSessionParams,
  WorkoutScheduleData,
} from '@/models/workout/workout.types';

export interface TWorkoutStore {
  userWorkoutData: UserWorkoutData[] | null;
  setUserWorkoutData: Action<TWorkoutStore, UserWorkoutData[] | null>;
  isWorkoutDataLoading: boolean;
  setIsWorkoutDataLoading: Action<TWorkoutStore, boolean>;
  fetchUserWorkoutData: Thunk<TWorkoutStore, UserWorkoutSessionParams>;
  workoutScheduleData: WorkoutScheduleData[] | null;
  setWorkoutScheduleData: Action<TWorkoutStore, WorkoutScheduleData[] | null>;
  isWorkoutScheduleLoading: boolean;
  setIsWorkoutScheduleLoading: Action<TWorkoutStore, boolean>;
  fetchWorkoutScheduleData: Thunk<
    TWorkoutStore,
    Omit<UserWorkoutSessionParams, 'userId'>
  >;
}

const WorkoutStore: TWorkoutStore = {
  userWorkoutData: [],
  isWorkoutDataLoading: false,
  setUserWorkoutData: action((state, payload) => {
    state.userWorkoutData = payload;
  }),
  setIsWorkoutDataLoading: action((state, payload) => {
    state.isWorkoutDataLoading = payload;
  }),
  fetchUserWorkoutData: thunk(async (actions, params) => {
    actions.setIsWorkoutDataLoading(true);
    try {
      const response =
        await workoutModel.fetchUserWorkoutSessionInfoById(params);
      if (response) {
        actions.setUserWorkoutData(response.data);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to fetch user workout data:', error);
    } finally {
      actions.setIsWorkoutDataLoading(false);
    }
  }),
  workoutScheduleData: [],
  isWorkoutScheduleLoading: false,
  setWorkoutScheduleData: action((state, payload) => {
    state.workoutScheduleData = payload;
  }),
  setIsWorkoutScheduleLoading: action((state, payload) => {
    state.isWorkoutScheduleLoading = payload;
  }),
  fetchWorkoutScheduleData: thunk(async (actions, params) => {
    actions.setIsWorkoutScheduleLoading(true);
    try {
      const response = await workoutModel.fetchWorkoutSchedule(params);
      if (response) {
        actions.setWorkoutScheduleData(response.data);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to fetch workout schedule data:', error);
    } finally {
      actions.setIsWorkoutScheduleLoading(false);
    }
  }),
};

export default WorkoutStore;
