import { getAPIUrl } from "../../global";
import { Get, Post } from "../../headerIntercepter";

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