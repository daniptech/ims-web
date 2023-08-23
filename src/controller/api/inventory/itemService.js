import { getAPIUrl } from '../../global';
import { Get, Post, Put, Remove } from '../../headerIntercepter';

export const createItem = (data) => {
  const url = getAPIUrl('inventory.item.create');
  return Post(url, data, true);
};

export const getItem = (params = {}) => {
  const url = getAPIUrl('inventory.item.get');
  return Get(url, true, params);
};

export const getSingleItem = (urldata,params = {}) => {
  const url = getAPIUrl('inventory.item.getSingleItem',urldata);
  return Get(url, true, params);
};
export const updateItem = (data,params = {}) => {
  const url = getAPIUrl('inventory.item.update',params);
  return Put(url,data, true);
};
export const removeItem = (params = {}) => {
  const url = getAPIUrl('inventory.item.remove',params);
  return Remove(url,true);
};