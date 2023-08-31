import { getAPIUrl } from "../../global";
import { Get, Post, Put, Remove } from "../../headerIntercepter";

export const createVendor = (data) => {
    const url = getAPIUrl('purchase.vendor.create');
    return Post(url, data, true);
  };
  export const getVendor = (params = {}) => {
    const url = getAPIUrl('purchase.vendor.get');
    return Get(url, true, params);
  };
  export const getSingleVendor = (urldata,params = {}) => {
    const url = getAPIUrl('purchase.vendor.getSingleVendor',urldata);
    return Get(url, true, params);
  };
  export const updateVendor = (data,params = {}) => {
    const url = getAPIUrl('purchase.vendor.update',params);
    return Put(url,data, true);
  };
  export const removeVendor = (params = {}) => {
    const url = getAPIUrl('purchase.vendor.remove',params);
    return Remove(url,true);
  };