import { Action, action } from 'easy-peasy';

import { User } from '@/models/user/user.types';

export interface TAdminState {
  admin: User | null;
  setAdmin: Action<TAdminState, User | null>;
  isLoading: boolean;
  setIsLoading: Action<TAdminState, boolean>;
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
};

export default AdminStore;
