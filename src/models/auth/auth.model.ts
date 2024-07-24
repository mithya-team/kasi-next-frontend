import { request } from '@/lib/axios/request';

import {
  ForgotPasswordFormData,
  LoginFormData,
  LoginResponse,
  SignupFormData,
  SignupResponse,
} from '@/models/auth/auth.types';

const authModel = {
  async signup(data: SignupFormData) {
    return request<SignupResponse>('/auth/coach-signup', {
      data,
      method: 'POST',
    });
  },

  async login(data: LoginFormData) {
    return request<LoginResponse>('/auth/coach-login', {
      data,
      method: 'POST',
    });
  },

  async getUpdatedToken(oldRefreshToken: string) {
    return request('/auth/refresh', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${oldRefreshToken}`,
      },
    });
  },

  async forgotPasword(data: ForgotPasswordFormData) {
    return request('/auth/coach-forgot-password', {
      method: 'POST',
      data,
    });
  },

  async ResetPassword(otpCode: string, newPassword: string) {
    return request('/auth/coach-reset-password', {
      method: 'POST',
      data: { otpCode, newPassword },
    });
  },
};

export default authModel;
