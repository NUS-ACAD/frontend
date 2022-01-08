import ApiService from './apiService';

export const forkPlan = async ({ id }) => {
  const response = await ApiService.post(`/api/fork/${id}`);
  return response.data;
};

export const createPlan = async ({
  isPrimary,
  startYear,
  title,
  description,
  semesters,
}) => {
  const response = await ApiService.post('/api/plans', {
    isPrimary,
    startYear,
    title,
    description,
    semesters,
  });
  return response.data;
};

export const updatePlan = async ({
  id,
  isPrimary,
  startYear,
  title,
  description,
  semesters,
}) => {
  const response = await ApiService.patch(`/api/plans/${id}`, {
    isPrimary,
    startYear,
    title,
    description,
    semesters,
  });
  return response.data;
};

export const deletePlan = async ({ id }) => {
  const response = await ApiService.delete(`/api/plans/${id}`);
  return response.data;
};

export const getPlan = async ({ id }) => {
  const response = await ApiService.get(`/api/plans/${id}`);
  return response.data;
};
