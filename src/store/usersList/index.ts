import { Action, action, Thunk, thunk } from 'easy-peasy';

import userModel from '@/models/user/user.model';
import { User, UsersListParams } from '@/models/user/user.types';

export interface TUsersListStore {
  usersList: User[] | null;
  setUsersList: Action<TUsersListStore, User[] | null>;
  isLoading: boolean;
  setIsLoading: Action<TUsersListStore, boolean>;
  fetchUsers: Thunk<TUsersListStore, UsersListParams>;
}

const UsersListStore: TUsersListStore = {
  usersList: [],
  setUsersList: action((state, payload) => {
    state.usersList = payload;
  }),
  isLoading: false,
  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  fetchUsers: thunk(async (actions, params) => {
    actions.setIsLoading(true);
    try {
      const response = await userModel.fetchUsersList(params);
      if (response) {
        actions.setUsersList(response.data);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to fetch users:', error);
    } finally {
      actions.setIsLoading(false);
    }
  }),
};

export default UsersListStore;
