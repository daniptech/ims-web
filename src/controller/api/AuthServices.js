import { getAPIUrl } from '../global';
import { Get, Post } from '../headerIntercepter';

export const login = (data) => {
  const url = getAPIUrl('auth.login');
  return Post(url, data, false);
};
export const verifyOTP = (data) => {
  const url = getAPIUrl('auth.verifyOTP');
  return Post(url, data, false);
};
export const user = () => {
  const url = getAPIUrl('auth.user');
  return Get(url, true);
};
export const allUser = () => {
  const url = getAPIUrl('auth.userAll');
  return Get(url, true);
};

export const createUser=(data)=>{
  const url = getAPIUrl('auth.craeteUser');
  return Post(url, data, true);
}
