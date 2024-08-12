import { request } from '@/lib/axios/request';

import {
  User,
  UserListResponse,
  UsersListParams,
} from '@/models/user/user.types';

const userModel = {
  async fetchUsersList(params: UsersListParams) {
    const { page = 1, limit = 15, search, sort, planId } = params;
    const response = await request<UserListResponse>('/coach/users', {
      method: 'GET',
      params: {
        page,
        limit,
        search,
        sort,
        planId,
      },
    });
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
