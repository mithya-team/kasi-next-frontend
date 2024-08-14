import { Action, action } from 'easy-peasy';

export interface FilterStore {
  selectedFilters: string[];
  updateSelectedFilter: Action<FilterStore, string[]>;
}

const filterStore: FilterStore = {
  selectedFilters: [],

  updateSelectedFilter: action((state, payload) => {
    state.selectedFilters = payload;
  }),
};

export default filterStore;
