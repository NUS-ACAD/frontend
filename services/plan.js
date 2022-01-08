import ApiService from './apiService';

export const forkPlan = async ({ id }) => {
  const response = await ApiService.post(`/fork/${id}`);
  return response.data;
};

export const createPlan = async ({
  isPrimary,
  startYear,
  title,
  description,
  semesters,
}) => {
  const response = await ApiService.post('plans', {
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
  const response = await ApiService.put(`plans/${id}`, {
    isPrimary,
    startYear,
    title,
    description,
    semesters,
  });
  return response.data;
};

export const deletePlan = async ({ id }) => {
  const response = await ApiService.delete(`plans/${id}`);
  return response.data;
};

export const getPlan = async ({ id }) => {
  const response = await ApiService.get(`plans/${id}`);
  return response.data;
};
