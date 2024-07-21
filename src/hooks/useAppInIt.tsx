'use client';
import { isAxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import axiosInstance from '@/lib/axios/axios';
import storage, { EStorageKey } from '@/lib/storage';
import useAuthActions from '@/hooks/useAuthActions';

import authModel from '@/models/auth/auth.model';
import { JwtDecodeResponse } from '@/models/auth/auth.types';

function useAppInit() {
  const [appInitialized, setAppInitialized] = useState(false);

  const { me, setAuthHeader, logout } = useAuthActions();
  const router = useRouter();

  const loginScreen = () => router.push('/login');

  const init = async () => {
    axiosInstance.interceptors.response.use(
      (res) => res,
      async (err) => {
        if (isAxiosError(err)) {
          if (err.config?.url?.includes('/refresh')) logout(false);
          else if (err.response?.status === 401) {
            try {
              const refreshToken = storage.get(EStorageKey.REFRESH_TOKEN);
              if (refreshToken) {
                const res = await authModel.getUpdatedToken(refreshToken);
                if (res.accessToken) {
                  setAuthHeader(res.accessToken);
                  storage.set(EStorageKey.ACCESS_TOKEN, res.accessToken);
                }
                if (res.refreshToken)
                  storage.set(EStorageKey.REFRESH_TOKEN, res.refreshToken);
              }
            } catch (error) {
              logout();
            }
          }
        }
        return Promise.reject(err);
      },
    );

    const access_token = storage.get(EStorageKey.ACCESS_TOKEN);

    if (access_token) {
      await handleAccessToken(access_token, setAuthHeader, loginScreen);
      await me();
    }
    setAppInitialized(true);
  };

  return {
    init,
    appInitialized,
  };
}

export default useAppInit;

const handleAccessToken = async (
  access_token: string,
  setAuthHeader: (accessToken: string) => void,
  loginScreen: () => void,
) => {
  const accessTokenData: JwtDecodeResponse = jwtDecode(access_token);
  const currentTimestamp = Date.now() / 1000; // Convert to seconds

  if (accessTokenData?.exp <= currentTimestamp) {
    // Access token is expired
    const refresh_token = storage.get(EStorageKey.REFRESH_TOKEN);

    if (refresh_token) {
      // Decode the refresh token to check for expiration
      const refreshTokenData: JwtDecodeResponse = jwtDecode(refresh_token);

      if (refreshTokenData?.exp <= currentTimestamp) {
        // Both access and refresh tokens are expired, send to home screen
        loginScreen();
      } else {
        // Refresh the access token using an API call
        const {
          accessToken: updatedAccessToken,
          refreshToken: updatedRefreshToken,
        } = await authModel.getUpdatedToken(refresh_token);

        if (updatedAccessToken) {
          storage.set(EStorageKey.ACCESS_TOKEN, updatedAccessToken);
          setAuthHeader(updatedAccessToken);
        }

        if (updatedRefreshToken)
          storage.set(EStorageKey.REFRESH_TOKEN, updatedRefreshToken);
      }
    }
  } else {
    // Access token is not expired, continue as normal
    setAuthHeader(access_token);
  }
};
