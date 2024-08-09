import { Action, action, Thunk, thunk } from 'easy-peasy';

import UserModel from '@/models/user/user.model';
import {
  User,
  UserListResponse,
  UsersListParams,
} from '@/models/user/user.types';
export interface TUserState {
  user: User | null;
  setUser: Action<TUserState, User | null>;
  isLoading: boolean;
  setIsLoading: Action<TUserState, boolean>;
  showUserWorkoutContent: boolean;
  setShowUserWorkoutContent: Action<TUserState, boolean>;
  fetchUser: Thunk<TUserState, string>;
  usersList: User[] | null;
  setUsersList: Action<TUserState, User[] | null>;
  usersListLoading: boolean;
  setUsersListLoading: Action<TUserState, boolean>;
  hasMore: boolean;
  setHasMore: Action<TUserState, boolean>;
  fetchUsersList: Thunk<TUserState, UsersListParams>;
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
  usersList: [],
  setUsersList: action((state, payload) => {
    state.usersList = payload;
  }),
  usersListLoading: false,
  setUsersListLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  hasMore: true,
  setHasMore: action((state, payload) => {
    state.hasMore = payload;
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

  fetchUsersList: thunk(async (actions, params, { getState }) => {
    actions.setUsersListLoading(true);
    try {
      const { page = 1 } = params;
      const response: UserListResponse = await UserModel.fetchUsersList(params);
      const { usersList } = getState();
      if (response) {
        if (page === 1) {
          actions.setUsersList(response.data);
        } else {
          actions.setUsersList([...(usersList || []), ...response.data]);
        }
        actions.setHasMore((usersList ?? [])?.length < response.total);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn('Failed to fetch users:', error);
    } finally {
      actions.setUsersListLoading(false);
    }
  }),
};

export default UserStore;
