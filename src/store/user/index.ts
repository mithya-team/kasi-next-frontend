import { Action, action, Thunk, thunk } from 'easy-peasy';

import UserModel from '@/models/user/user.model';
import {
  User,
  UserListResponse,
  UsersListParams,
} from '@/models/user/user.types';

const LIMIT = 10;
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
  appendUsersList: Action<TUserState, User[]>;
  usersListLoading: boolean;
  setUsersListLoading: Action<TUserState, boolean>;
  totalUsers: number;
  setTotalUsers: Action<TUserState, number>;
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
  appendUsersList: action((state, payload) => {
    state.usersList = [...(state.usersList || []), ...payload];
  }),
  usersListLoading: false,
  setUsersListLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  totalUsers: 0,
  setTotalUsers: action((state, payload) => {
    state.totalUsers = payload;
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
      const response: UserListResponse = await UserModel.fetchUsersList(params);
      if (response) {
        const { usersList } = getState();
        if (params.page === 1) {
          actions.setUsersList(response.data);
        } else {
          actions.appendUsersList(response.data);
        }
        actions.setTotalUsers(response.total);
        actions.setHasMore(
          response.data.length === LIMIT &&
            (usersList?.length || 0) + response.data.length <= response.total,
        );
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
