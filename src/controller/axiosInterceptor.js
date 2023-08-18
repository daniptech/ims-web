import Axios from "axios";
import { getEnvValue } from "./Environment";
import {
  getRefreshToken,
  getUserToken,
  setRefreshToken,
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


    if (error?.response && error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      return axios
        .get("/api/user/refresh-token", {
          params: { refreshToken: refreshToken }
        })
        .then(async (res) => {
          debugger
          if (res.status === 200) {
            await setUserToken(res.data.token);
            await setRefreshToken(res.data.refreshToken)
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
