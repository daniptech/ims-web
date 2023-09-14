import { getAPIUrl } from "../../global";
import { Post, Put, Remove } from "../../headerIntercepter";

export const createCompositeItem = (data) => {
    const url = getAPIUrl('inventory.item.create');
    return Post(url, data, true);
  };
  
  export const updateCompositeItem = (data, params = {}) => {
    const url = getAPIUrl('inventory.item.update', params);
    return Put(url, data, true);
  };
  export const removeCompositeItem = (params = {}) => {
    const url = getAPIUrl('inventory.item.remove', params);
    return Remove(url, true);
  };