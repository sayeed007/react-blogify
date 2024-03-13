/* eslint-disable no-debugger */
/* eslint-disable no-useless-catch */
import { useEffect } from "react";
import axios from 'axios';
import { api } from "../api";
import { useAuth } from "./useAuth";

const useAxios = () => {
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    // Add a request interceptor
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.authToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add a response interceptor
    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (
          (error?.response?.status === 401 || error?.response?.status === 403)
          &&
          (!originalRequest._retry)
        ) {
          originalRequest._retry = true;

          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );

            const authToken = response.data.accessToken;
            const modifiedRefreshToken = response.data.refreshToken;

            console.log(`New Token: ${authToken}`);
            setAuth({ ...auth, authToken: authToken, refreshToken: modifiedRefreshToken });

            let authenticUserInfo = localStorage.getItem("auth-user") ? JSON.parse(localStorage.getItem("auth-user")) : {};

            authenticUserInfo.authToken = authToken;
            authenticUserInfo.refreshToken = modifiedRefreshToken;

            localStorage.setItem('auth-user', JSON.stringify(authenticUserInfo));


            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${authToken}`;
            return axios(originalRequest);
          } catch (error) {
            throw error;
          }
        }

        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    }
  }, [auth.authToken]);

  return { api };
};

export default useAxios;
