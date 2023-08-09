import { axios } from "./axiosInterceptor";
import { getUserToken } from "./localStorageHandler";

function header(requireAuth = true) {
  let headers = {
    "Content-Type": "application/json",
  };
  if (requireAuth) headers["Authorization"] = `Bearer ${getUserToken()}`;
  return headers;
}

export function Get(url, params,auth = true) {
  return axios.get(url, { headers: header(), params: params });
}

export function Post(url, data, auth = true) {
  return axios.post(url, data, { headers: header(auth) });
}

export function Patch(url, data,auth = true) {
  return axios.patch(url, data, { headers: header() });
}

export function Remove(url,auth = true) {
  return axios.delete(url, { headers: header() });
}