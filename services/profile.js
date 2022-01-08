import ApiService from './apiService';

export const getProfile = async ({ id }) => {
  const response = await ApiService.get(`users/${id}`);
  return response.data;
};

export const followPerson = async ({ id, toFollow }) => {
  const response = await ApiService.post('follows', {
    userId: id,
    toFollow,
  });
  return response.data;
};

export const likePlan = async ({ id, toLike }) => {
  const response = await ApiService.post('likes', {
    planId: id,
    toLike,
  });
  return response.data;
};
