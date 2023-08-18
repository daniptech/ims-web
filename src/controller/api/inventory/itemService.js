import { getAPIUrl } from "../../global";
import { Post } from "../../headerIntercepter";

export const createItem = (data) => {
    const url = getAPIUrl("inventory.item.create");
    return Post(url, data, true);
}