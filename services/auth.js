import ApiService from './apiService';

export const login = async ({ email, password }) => {
  const response = await ApiService.post('/api/login', { email, password });
  // Contains user and token, handle this on the frontend side, not here.
  return response.data;
};

export const register = async ({
  name,
  email,
  password,
  primaryDegree,
  secondDegree,
  secondMajor,
  firstMinor,
  secondMinor,
  matriculationYear,
}) => {
  const response = await ApiService.post('/api/users', {
    name,
    email,
    password,
    primaryDegree,
    secondDegree,
    secondMajor,
    firstMinor,
    secondMinor,
    matriculationYear,
  });
  // Contains user and token, handle this on the frontend side, not here.
  return response.data;
};
