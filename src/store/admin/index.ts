/* eslint-disable no-case-declarations */
import { Action, action, Thunk, thunk } from 'easy-peasy';

import adminModel from '@/models/admin/admin.model';
import { UnConfirmedUserWithDetails } from '@/models/admin/admin.types';
import userModel from '@/models/user/user.model';
import { User } from '@/models/user/user.types';

export interface TAdminState {
  admin: User | null;
  setAdmin: Action<TAdminState, User | null>;
  isLoading: boolean;
  setIsLoading: Action<TAdminState, boolean>;
  unConfirmedUsers: UnConfirmedUserWithDetails[];
  setUnConfirmedUsers: Action<TAdminState, UnConfirmedUserWithDetails[]>;
  fetchUnConfirmedUsers: Thunk<
    TAdminState,
    { coachId: string; userIds: string[] }
  >;
  updateConfirmedUsers: Action<
    TAdminState,
    { action: 'ADD' | 'REMOVE' | 'UPDATE'; user: UnConfirmedUserWithDetails }
  >;
}

const AdminStore: TAdminState = {
  admin: null,
  setAdmin: action((state, payload) => {
    state.admin = payload;
  }),
  isLoading: false,
  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),
  unConfirmedUsers: [],
  setUnConfirmedUsers: action((state, payload) => {
    state.unConfirmedUsers = payload;
  }),
  fetchUnConfirmedUsers: thunk(async (actions, { coachId, userIds }) => {
    actions.setIsLoading(true);
    try {
      const response = await adminModel.fetchConnectionRequest(
        coachId,
        userIds,
      );
      const userFetchPromises = response?.map(async (connection) => {
        const user = await userModel.fetchUserById(connection.userId);
        return { ...connection, ...user };
      });
      const unConfirmedUsersWithDetails = await Promise.all(userFetchPromises);
      actions.setUnConfirmedUsers(unConfirmedUsersWithDetails);
    } catch (error) {
      console.error('Failed to fetch user connections:', error);
    } finally {
      actions.setIsLoading(false);
    }
  }),
  updateConfirmedUsers: action((state, { action, user }) => {
    switch (action) {
      case 'ADD':
        state.unConfirmedUsers.push(user);
        break;
      case 'REMOVE':
        const userIndex = state.unConfirmedUsers.findIndex(
          (existingUser) => existingUser?._id === user?._id,
        );
        if (userIndex !== -1) {
          state.unConfirmedUsers[userIndex].status = 'declined';
        }
        break;
      case 'UPDATE':
        const existingUserIndex = state.unConfirmedUsers.findIndex(
          (existingUser) => existingUser._id === user._id,
        );
        if (existingUserIndex !== -1) {
          state.unConfirmedUsers[existingUserIndex].status = 'connected';
        }
        break;
      default:
        console.warn('Invalid update action provided for confirmed users');
    }
  }),
};

export default AdminStore;
