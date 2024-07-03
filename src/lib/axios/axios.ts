import axios from 'axios';

import { APP_CONFIG } from '@/constant/config';

const axiosInstance = axios.create({
  baseURL: APP_CONFIG.API_URL,
});

export default axiosInstance;
