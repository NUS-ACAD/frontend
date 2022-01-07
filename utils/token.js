export const TOKEN_KEY = 'authToken';

const getToken = () => localStorage.getItem(TOKEN_KEY);

const storeToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

const tokenUtils = { getToken, storeToken, removeToken };

export default tokenUtils;
