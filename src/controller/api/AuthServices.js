import { getAPIUrl } from "../global";
import { Post } from "../headerIntercepter";

export const login = (data) => {
    const url = getAPIUrl("auth.sendOTP");
    return Post(url, data, false);
}
export const verifyOTP = (data) => {
    const url = getAPIUrl("auth.verifyOTP");
    return Post(url, data, false);
}