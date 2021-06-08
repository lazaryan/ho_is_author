import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';

export const getRequest = (path: string, config?: AxiosRequestConfig): AxiosPromise =>
  axios.get(path, config);

export const deleteRequest = (path: string, config?: AxiosRequestConfig): AxiosPromise =>
  axios.delete(path, config);

export const postRequest = <T = any>(path: string, data: T, config?: AxiosRequestConfig): AxiosPromise =>
  axios.post(path, data, config);

export const putRequest = <T = any>(path: string, data: T, config?: AxiosRequestConfig): AxiosPromise =>
  axios.put(path, data, config);
