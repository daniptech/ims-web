import { getAPIUrl } from '../global';
import { Get, Post, Put, Remove } from '../headerIntercepter';

export const getPaymentTerm = () => {
  const url = getAPIUrl('paymentTerm.all');
  return Get(url, true);
};

export const addPaymentTerm = (data) => {
  const url = getAPIUrl('paymentTerm.add');
  return Post(url, data, true);
};

export const getBrand = () => {
  const url = getAPIUrl('brand.all');
  return Get(url, true);
};
export const addBrand = (data) => {
  const url = getAPIUrl('brand.add');
  return Post(url, data, true);
};
export const updateBrand = (data, params = {}) => {
  const url = getAPIUrl('brand.update', params);
  return Put(url, data, true);
};
export const removeBrand = (params = {}) => {
  const url = getAPIUrl('brand.remove', params);
  return Remove(url, true);
};