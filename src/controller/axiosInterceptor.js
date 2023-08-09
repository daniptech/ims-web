import Axios from "axios";
import { getEnvValue } from "./Environment";
import {
  getRefreshToken,
  getUserToken,
  setUserToken,
} from "./localStorageHandler";

export const axios = Axios.create({
  baseURL: getEnvValue("REACT_APP_API_URL"),
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    console.log("error");
    const originalRequest = error.config;


    if (error?.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      return axios
        .post("/api/token/refresh/", {
          refresh: refreshToken,
        })
        .then(async (res) => {
          if (res.status === 200) {
            await setUserToken(res.data.access);
            originalRequest.headers["Authorization"] =
              "Bearer " + getUserToken();
            return axios(originalRequest);
          }
        })
        .catch((e) => {
          console.log(e, "refresh error");
        //   history.push(routes.logout);
        });
    }
    return Promise.reject(error);
  }
);
