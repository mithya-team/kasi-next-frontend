import { Action, action } from 'easy-peasy';

import { ProductPlanId } from '@/models/user/user.types';
import { WorkoutSessionStatus } from '@/models/workout/workout.types';

export interface TFilterStore {
  usersScreenFilter: ProductPlanId[];
  scheduleFilters: WorkoutSessionStatus[];
  usersScreenSort: 'asc' | 'desc';
  scheduleScreenSort: 'asc' | 'desc';
  updateScheduleFilters: Action<TFilterStore, WorkoutSessionStatus[]>;
  updateUsersScreenFilter: Action<TFilterStore, ProductPlanId[]>;
  updateUsersScreenSort: Action<TFilterStore, 'asc' | 'desc'>;
  updateScheduleScreenSort: Action<TFilterStore, 'asc' | 'desc'>;
}

const filterStore: TFilterStore = {
  scheduleFilters: [],
  usersScreenFilter: [],
  usersScreenSort: 'desc',
  scheduleScreenSort: 'desc',
  updateScheduleFilters: action((state, payload) => {
    state.scheduleFilters = payload;
  }),
  updateUsersScreenFilter: action((state, payload) => {
    state.usersScreenFilter = payload;
  }),
  updateUsersScreenSort: action((state, payload) => {
    state.usersScreenSort = payload;
  }),
  updateScheduleScreenSort: action((state, payload) => {
    state.scheduleScreenSort = payload;
  }),
};

export default filterStore;
