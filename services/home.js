/* eslint-disable import/prefer-default-export */
import ApiService from './apiService';

export const getHome = async () => {
  const response = await ApiService.get('/api/home');
  return response.data;
};
