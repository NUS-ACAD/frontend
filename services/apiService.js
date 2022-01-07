import axios from 'axios';
import humps from 'humps';

import tokenUtils from '../utils/token';

const ApiService = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_API}`,
  headers: { 'Content-Type': 'application/json' },
  transformResponse: [
    ...axios.defaults.transformResponse,
    (data) => humps.camelizeKeys(data), // takes care of case issues
  ],
  transformRequest: [
    (data) => humps.decamelizeKeys(data), // takes care of case issues
    ...axios.defaults.transformRequest,
  ],
});

ApiService.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = tokenUtils.getToken();
      // eslint-disable-next-line no-param-reassign
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  // eslint-disable-next-line consistent-return
  (error) => {
    if (error instanceof Error) {
      return Promise.reject(error);
    }
  },
);

export default ApiService;
