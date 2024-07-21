import { Action, action, Thunk, thunk } from 'easy-peasy';

import workoutModel from '@/models/workout/workout.model';
import {
  UserWorkoutData,
  UserWorkoutSessionParams,
  WorkoutConfigDetails,
  WorkoutScheduleData,
  WorkoutSessionDetails,
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
  workoutSessionDetails: WorkoutSessionDetails | null;
  setWorkoutSessionDetails: Action<TWorkoutStore, WorkoutSessionDetails | null>;
  isWorkoutSessionDetailsLoading: boolean;
  setIsWorkoutSessionDetailsLoading: Action<TWorkoutStore, boolean>;
  fetchWorkoutSessionDetails: Thunk<TWorkoutStore, string>;

  workoutDataByConfigSlug: WorkoutConfigDetails | null;
  setWorkoutDataByConfigSlug: Action<
    TWorkoutStore,
    WorkoutConfigDetails | null
  >;
  isWorkoutDataByConfigSlugLoading: boolean;
  setIsWorkoutDataByConfigSlugLoading: Action<TWorkoutStore, boolean>;
  fetchWorkoutDataByConfigSlug: Thunk<TWorkoutStore, string>;
  isWorkoutDetailPage: boolean;
  setIsWorkoutDetailPage: Action<TWorkoutStore, boolean>;
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
  isWorkoutDetailPage: false,
  setIsWorkoutDetailPage: action((state, payload) => {
    state.isWorkoutDetailPage = payload;
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

  // New states and actions implementation
  workoutSessionDetails: null,
  isWorkoutSessionDetailsLoading: false,
  setWorkoutSessionDetails: action((state, payload) => {
    state.workoutSessionDetails = payload;
  }),
  setIsWorkoutSessionDetailsLoading: action((state, payload) => {
    state.isWorkoutSessionDetailsLoading = payload;
  }),
  fetchWorkoutSessionDetails: thunk(async (actions, workoutId) => {
    actions.setIsWorkoutSessionDetailsLoading(true);
    try {
      const response =
        await workoutModel.fetchWorkoutSessionsDetails(workoutId);
      if (response) {
        actions.setWorkoutSessionDetails(response);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to fetch specific workout data:', error);
    } finally {
      actions.setIsWorkoutSessionDetailsLoading(false);
    }
  }),

  workoutDataByConfigSlug: null,
  isWorkoutDataByConfigSlugLoading: false,
  setWorkoutDataByConfigSlug: action((state, payload) => {
    state.workoutDataByConfigSlug = payload;
  }),
  setIsWorkoutDataByConfigSlugLoading: action((state, payload) => {
    state.isWorkoutDataByConfigSlugLoading = payload;
  }),
  fetchWorkoutDataByConfigSlug: thunk(async (actions, configSlug) => {
    actions.setIsWorkoutDataByConfigSlugLoading(true);
    try {
      const response = await workoutModel.fetchWorkoutConfig(configSlug);
      if (response) {
        actions.setWorkoutDataByConfigSlug(response);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to fetch workout data by config slug:', error);
    } finally {
      actions.setIsWorkoutDataByConfigSlugLoading(false);
    }
  }),
};

export default WorkoutStore;
