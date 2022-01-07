import axios from 'axios';
import humps from 'humps';

const ApiService = axios.create({
  baseURL: `${process.env.BACKEND_API}`,
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
    const newConfig = { ...config };
    if (config.params) {
      newConfig.params = humps.decamelizeKeys(config.params);
    }
    return newConfig;
  },
  // eslint-disable-next-line consistent-return
  (error) => {
    if (error instanceof Error) {
      return Promise.reject(error);
    }
  },
);

export default ApiService;
