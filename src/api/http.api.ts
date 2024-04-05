import axios from 'axios';
import { AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig, AxiosRequestHeaders } from 'axios';
import { ApiError } from '@app/api/ApiError';
import { readToken } from '@app/services/localStorage.service';

export const httpApi = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

httpApi.interceptors.request.use((config) => {
  config.headers = { ...config.headers, Authorization: `Bearer ${readToken()}` } as AxiosRequestHeaders;

  return config;
});

httpApi.interceptors.response.use(undefined, (error: AxiosError) => {
  throw new ApiError<ApiErrorData>("" || error.message);
});

export interface ApiErrorData {
  message: string;
}
