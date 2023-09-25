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
export const updatePaymentTerm = (data, params = {}) => {
  const url = getAPIUrl('paymentTerm.update', params);
  return Put(url, data, true);
};
export const removePaymentTerm = (params = {}) => {
  const url = getAPIUrl('paymentTerm.remove', params);
  return Remove(url, true);
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

export const getManufacturer = () => {
  const url = getAPIUrl('manufacturer.all');
  return Get(url, true);
};
export const addManufacturer = (data) => {
  const url = getAPIUrl('manufacturer.add');
  return Post(url, data, true);
};
export const updateManufacturer = (data, params = {}) => {
  const url = getAPIUrl('manufacturer.update', params);
  return Put(url, data, true);
};
export const removeManufacturer = (params = {}) => {
  const url = getAPIUrl('manufacturer.remove', params);
  return Remove(url, true);
};

export const getSalesPerson = () => {
  const url = getAPIUrl('salesperson.all');
  return Get(url, true);
};

export const addSalesPerson = (data) => {
  const url = getAPIUrl('salesperson.add');
  return Post(url, data, true);
};
export const updateSalesPerson = (data, params = {}) => {
  const url = getAPIUrl('salesperson.update', params);
  return Put(url, data, true);
};
export const removeSalesPerson = (params = {}) => {
  const url = getAPIUrl('salesperson.remove', params);
  return Remove(url, true);
};

export const getReason = () => {
  const url = getAPIUrl('reason.all');
  return Get(url, true);
};

export const addReason = (data) => {
  const url = getAPIUrl('reason.add');
  return Post(url, data, true);
};
export const removeReason = (params = {}) => {
  const url = getAPIUrl('reason.remove', params);
  return Remove(url, true);
};
