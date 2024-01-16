import { getAPIUrl } from '../../global';
import { Get, Post, Put, Remove } from '../../headerIntercepter';

export const getModules = () => {
  const url = getAPIUrl('role.modules');
  return Get(url);
};

export const createRole = (data) => {
  const url = getAPIUrl('role.add');
  return Post(url, data, true);
};
export const getAllRole = () => {
  const url = getAPIUrl('role.all');
  return Get(url);
};
export const removeRole = (params = {}) => {
  const url = getAPIUrl('role.delete', params);
  return Remove(url, true);
};
export const getRole = (params={}) => {
  const url = getAPIUrl('role.getrole',params);
  return Get(url);
};

export const updateRole = (data, params = {}) => {
  const url = getAPIUrl('role.update', params);
  return Put(url, data, true);
};