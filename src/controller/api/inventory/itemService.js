import { getAPIUrl } from "../../global";
import { Get, Post } from "../../headerIntercepter";

export const createItem = (data) => {
    const url = getAPIUrl("inventory.item.create");
    return Post(url, data, true);
}

export const getItem = (params={}) => {
    const url = getAPIUrl('inventory.item.get')
    return Get(url, true,params);
}