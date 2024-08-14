import { request } from '@/lib/axios/request';

import {
  ActiveProduct,
  PaymentIntentResponse,
  SubscriptionProducts,
  UnConfirmedUser,
} from '@/models/admin/admin.types';
import { ProductPlanId } from '@/models/user/user.types';
import { User } from '@/models/user/user.types';

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
  async getInviteCodeById(id: string) {
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
    return request(`/coach-user-connection/connection/${userId}/${coachId}`, {
      method: 'DELETE',
    });
  },

  async productsList() {
    return request<SubscriptionProducts>('/coach-payment/products', {
      method: 'GET',
    });
  },
  async getActiveProduct() {
    return request<ActiveProduct[]>('users/my/coach-active-plan', {
      method: 'GET',
    });
  },
  async getClientSecret(productId: ProductPlanId) {
    return request<PaymentIntentResponse>(
      '/coach-payment/payment-web-subscription',
      {
        method: 'POST',
        data: {
          productId: productId,
        },
      },
    );
  },
  async cancelSubscription(id: string) {
    return request('coach-payment/active-subscriptions', {
      method: 'DELETE',
      data: {
        subscriptionId: id,
      },
    });
  },
  async updateAdmin(userId: string, data: Partial<User>) {
    return request<User>(`/users/${userId}`, {
      method: 'PUT',
      data,
    });
  },
  async generateInviteCode(id: string) {
    return request<{ code: string }>(`/coach-invite-code/${id}`, {
      method: 'POST',
    });
  },

  async renewCancelSubscription(subscriptionId: string) {
    return request(`/coach-payment/renew-canceled-subscription/`, {
      method: 'POST',
      data: {
        subscriptionId,
      },
    });
  },
  async updatePassword(
    id: string,
    data: { oldPassword: string; newPassword: string },
  ) {
    return request<User>(`/users/${id}/update-password`, {
      method: 'PUT',
      data,
    });
  },
};

export default adminModel;
