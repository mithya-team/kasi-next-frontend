import { request } from '@/lib/axios/request';

import { UnConfirmedUser } from '@/models/admin/admin.types';

const adminModel = {
  async fetchConnectionRequest(coachId: string, userIds: string[]) {
    return request<UnConfirmedUser[]>(
      `/coach-user-connection/${coachId}/connections/bulk`,
      {
        method: 'POST',
        data: { userIds: userIds },
      },
    );
  },
  async getCodeInviteCodeById(id: string) {
    return request<{ code: string }>(`/coach-invite-code/${id}`);
  },

  async acceptRequest(userId: string, coachId: string) {
    return request(`/coach-user-connection/request/${userId}/${coachId}`, {
      method: 'PUT',
      data: {
        action: 'accept',
      },
    });
  },

  async deleteRequest(userId: string, coachId: string) {
    return request(`/coach-user-connection/request/${userId}/${coachId}`, {
      method: 'DELETE',
    });
  },
};

export default adminModel;
