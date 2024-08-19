import { Action, action } from 'easy-peasy';

import { ProductPlanId } from '@/models/user/user.types';
import { WorkoutSessionStatus } from '@/models/workout/workout.types';

export interface FilterStore {
  usersScreenFilter: ProductPlanId[];
  scheduleFilters: WorkoutSessionStatus[];
  updateScheduleFilters: Action<FilterStore, WorkoutSessionStatus[]>;
  updateUsersScreenFilter: Action<FilterStore, ProductPlanId[]>;
}

const filterStore: FilterStore = {
  scheduleFilters: [],
  usersScreenFilter: [],
  updateScheduleFilters: action((state, payload) => {
    state.scheduleFilters = payload;
  }),
  updateUsersScreenFilter: action((state, payload) => {
    state.usersScreenFilter = payload;
  }),
};

export default filterStore;
