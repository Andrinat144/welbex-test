import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { apiURL } from '@/constants';
import { logout, updateToken } from '@/store/slices/userSlice';
import { AppStore } from '@/store/store';

export interface IRefreshResponse {
  accessToken: string;
  refreshToken: string;
}

type AxiosRequestConfigWithRetry = AxiosRequestConfig & { _retry?: boolean };

export const axiosApiClient = axios.create({ baseURL: apiURL, withCredentials: true });

let appStore: AppStore;

export const injectStore = (store: AppStore) => {
  appStore = store;
};

axiosApiClient.interceptors.request.use((config) => {
  const token = appStore.getState().users.userInfo?.accessToken;
  if (token) {
    config.headers.set({ Authorization: token });
  }

  return config;
});

const refrechToken = async () => {
  try {
    const response = await axios.post<IRefreshResponse>(`${apiURL}/auth/refresh`, {}, { withCredentials: true });
    if (response.status === 200) {
      const tokens = response.data;
      appStore.dispatch(updateToken(tokens));
      return tokens;
    }
    return null;
  } catch (error) {
    console.log(error);
    appStore.dispatch(logout());
    return null;
  }
};

axiosApiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = appStore.getState().users.userInfo?.refreshToken;
      if (token) {
        const newTokens = await refrechToken();
        if (newTokens) {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = newTokens.accessToken;
          } else {
            originalRequest.headers = { Authorization: newTokens.accessToken };
          }
          return axiosApiClient.request(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);
