import qs from 'qs';

import { request } from '@/lib/axios/request';

import {
  User,
  UserListResponse,
  UsersListParams,
} from '@/models/user/user.types';

const userModel = {
  async fetchUsersList(params: UsersListParams) {
    const {
      page = 1,
      limit = 15,
      search,
      sort,
      planIds,
      isSuperAdmin,
    } = params;
    // Transform planIds array into the correct query string format
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // Serialize parameters, ensuring no "[]" for array
    const queryString = qs.stringify(
      { page, limit, search, sort, planIds },
      { indices: false, arrayFormat: 'repeat' },
    );

    const response = await request<UserListResponse>(
      `/coach/${isSuperAdmin ? 'users-by-admin' : 'users'}?${queryString}`,
      {
        method: 'GET',
      },
    );
    return response;
  },

  async fetchUserById(id: string) {
    return request<User>(`/users/${id}`);
  },
  async me() {
    return request<User>('/users/me');
  },
};

export default userModel;
