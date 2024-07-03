/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosRequestConfig } from 'axios';

import axiosInstance from '@/lib/axios/axios';

import { RequestError } from './@types';

type JSONType = Record<string, any>;

export const request = async <T = JSONType>(
  path: string,
  config?: AxiosRequestConfig,
  _log = true
): Promise<T> => {
  if (!axiosInstance.defaults.baseURL) {
    return Promise.reject(new Error('Error: Base Url is not provided'));
  }

  const { data } = await axiosInstance.request<T>({
    ...config,
    url: path,
  });

  return data;
};

export const requestErrorMessage = (error: RequestError): string | undefined =>
  error?.response?.data?.message ?? error.message;
