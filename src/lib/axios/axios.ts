import axios from 'axios';

import { APP_CONFIG } from '@/constant/config';

const axiosInstance = axios.create({
  baseURL: APP_CONFIG.API_URL,
});
export const axiosUtils = {
  setHeader: (key: string, value: string) => {
    axiosInstance.defaults.headers.common[key] = value;
  },
  setBaseUrl: (url: string) => {
    axiosInstance.defaults.baseURL = url;
  },
};
export default axiosInstance;
