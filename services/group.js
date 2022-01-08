import ApiService from './apiService';

export const createGroup = async ({ name, description }) => {
  const response = await ApiService.post('/api/groups', {
    groupName: name,
    groupDescription: description,
  });
  return response.data;
};

// export const createGroup = async ({ id, name, description }) => {
//   const response = await ApiService.patch(`groups/${id}`, {
//     groupName: name,
//     groupDescription: description,
//   });
//   return response.data;
// };

export const deleteGroup = async ({ id }) => {
  const response = await ApiService.delete(`/api/groups/${id}`);
  return response.data;
};

export const getGroup = async ({ id }) => {
  const response = await ApiService.get(`/api/groups/${id}`);
  return response.data;
};

// export const invite = async ({ groupId, inviteeId }) => {
//   const response = await ApiService.get('invites');
//   return response.data;
// };
