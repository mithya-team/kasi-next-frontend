import { Action, action, Thunk, thunk } from 'easy-peasy';

import UserModel from '@/models/user/user.model';
import { User } from '@/models/user/user.types';

export interface TUserState {
  user: User | null;
  setUser: Action<TUserState, User | null>;
  isLoading: boolean;
  setIsLoading: Action<TUserState, boolean>;
  showUserWorkoutContent: boolean;
  setShowUserWorkoutContent: Action<TUserState, boolean>;
  fetchUser: Thunk<TUserState, string>;
}

const UserStore: TUserState = {
  user: null,
  setUser: action((state, payload) => {
    state.user = payload;
  }),
  isLoading: false,
  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  showUserWorkoutContent: false,
  setShowUserWorkoutContent: action((state, payload) => {
    state.showUserWorkoutContent = payload;
  }),
  fetchUser: thunk(async (actions, userId) => {
    actions.setIsLoading(true);
    try {
      const response = await UserModel.fetchUserById(userId);
      if (response) {
        actions.setUser(response);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Failed to fetch user:', error);
    } finally {
      actions.setIsLoading(false);
    }
  }),
};

export default UserStore;
