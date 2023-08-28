import { getAPIUrl } from "../../global";
import { Get, Post, Put, Remove } from "../../headerIntercepter";

export const createCustomer = (data) => {
    const url = getAPIUrl('sales.customer.create');
    return Post(url, data, true);
  };
  export const getCustomer = (params = {}) => {
    const url = getAPIUrl('sales.customer.get');
    return Get(url, true, params);
  };
  export const getSingleCustomer = (urldata,params = {}) => {
    const url = getAPIUrl('sales.customer.getSingleCustomer',urldata);
    return Get(url, true, params);
  };
  export const updateCustomer = (data,params = {}) => {
    const url = getAPIUrl('sales.customer.update',params);
    return Put(url,data, true);
  };
  export const removeCustomer = (params = {}) => {
    const url = getAPIUrl('sales.customer.remove',params);
    return Remove(url,true);
  };