/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter } from 'next/navigation';

import { axiosUtils } from '@/lib/axios/axios';
import storage, { EStorageKey } from '@/lib/storage';
import { toast } from '@/lib/toast';

import { useStoreActions } from '@/store';

import authModel from '@/models/auth/auth.model';
import { LoginFormData, SignupFormData } from '@/models/auth/auth.types';
import userModel from '@/models/user/user.model';

function useAuthActions() {
  const { setAdmin } = useStoreActions(({ AdminStore: { setAdmin } }) => ({
    setAdmin,
  }));
  const router = useRouter();

  const signUp = async (data: SignupFormData) => {
    try {
      const res = await authModel.signup(data);
      if (res?.user) setAdmin(res.user);
      toast.success('Sign up successful');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Sign up failed');
      throw error;
    }
  };

  const storeTokens = (accessToken?: string, refreshToken?: string) => {
    if (accessToken) storage.set(EStorageKey.ACCESS_TOKEN, accessToken);
    if (refreshToken) storage.set(EStorageKey.REFRESH_TOKEN, refreshToken);
  };

  const clearTokens = () => {
    storage.remove(EStorageKey.ACCESS_TOKEN);
    storage.remove(EStorageKey.REFRESH_TOKEN);
  };

  const setAuthHeader = (accessToken: string) => {
    axiosUtils.setHeader('Authorization', `Bearer ${accessToken}`);
  };

  const login = async (data: LoginFormData) => {
    try {
      const res = await authModel.login(data);
      if (res.accessToken) {
        await authenticate(res);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const logout = async (showToast = true) => {
    try {
      setAdmin(null);
      clearTokens();
      router.push('/login');
      if (showToast) toast.success('Log out successful');
    } catch (error) {
      console.error(error);
    }
  };

  const me = async () => {
    try {
      const data = await userModel.me();
      setAdmin(data);
    } catch (error: any) {
      if (error?.response?.data?.name === 'TokenExpiredError') {
        console.log('token expired');
      } else {
        logout(false);
      }
    }
  };

  const authenticate = async (data: {
    accessToken: string;
    refreshToken: string;
  }) => {
    storeTokens(data.accessToken, data.refreshToken);
    setAuthHeader(data.accessToken);
    await me();
  };

  return {
    signUp,
    login,
    logout,
    me,
    storeTokens,
    setAuthHeader,
    clearTokens,
    authenticate,
  };
}

export default useAuthActions;
