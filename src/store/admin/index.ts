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
  adminCode: string | null;
  setAdminCode: Action<TAdminState, string | null>;
  fetchAdminCode: Thunk<TAdminState, string>;
  isSuperAdmin: boolean; // New state for super admin
  setSuperAdmin: Action<TAdminState, boolean>;
}

const AdminStore: TAdminState = {
  admin: null,
  setAdmin: action((state, payload) => {
    state.admin = payload;
    // Check if the admin has the 'ADMIN' role and set isSuperAdmin
    state.isSuperAdmin = payload?.roles.includes('ADMIN') ?? false;
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
  adminCode: null,
  setAdminCode: action((state, payload) => {
    state.adminCode = payload;
  }),
  fetchAdminCode: thunk(async (actions, adminId) => {
    if (!adminId) return;
    try {
      const res = await adminModel.getInviteCodeById(adminId);
      if (res) actions.setAdminCode(res.code);
    } catch (error) {
      console.log(error, 'fetching admin code');
    }
  }),
  isSuperAdmin: false, // Initialize to false
  setSuperAdmin: action((state, payload) => {
    state.isSuperAdmin = payload;
  }),
};

export default AdminStore;
