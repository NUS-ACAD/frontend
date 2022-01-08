import ApiService from './apiService';

export const createGroup = async ({ name, description }) => {
  const response = await ApiService.post('groups', {
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
  const response = await ApiService.delete(`groups/${id}`);
  return response.data;
};

export const getGroup = async ({ id }) => {
  const response = await ApiService.get(`groups/${id}`);
  return response.data;
};

// export const invite = async ({ groupId, inviteeId }) => {
//   const response = await ApiService.get('invites');
//   return response.data;
// };
