import { useCallback } from 'react';
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios';
import isObject from 'lodash/isObject';
import { getRequest, postRequest, deleteRequest, putRequest } from 'backend/request';
import isIE from 'helpers/isIE';
import checkMetaError from 'helpers/checkMetaError';
import { IKeyValue } from 'types/interfaces';

export enum ApiMethods {
  GET_USER = 'user',
  GET_HISTORIES = 'histories',
  CREATE_TASK = 'create'
}

export type RequestTypeWithoutBody = 'get' | 'delete';
export type RequestTypeWithBody = 'post' | 'put';

export type CallbackWithoutBody<T> = (runtimeParams?: IKeyValue, checkMeta?: boolean) => Promise<AxiosResponse<T>>;
export type CallbackWithBody<T> = (runtimePostParams: IKeyValue, runtimeUrlParams?: IKeyValue, checkMeta?: boolean) => Promise<AxiosResponse<T>>;

export type UseApiWithoutBody = <T = any>(url: string, params?: IKeyValue, config?: IKeyValue) => CallbackWithoutBody<T>;
export type UseApiWithBody = <T = any>(url: string, params?: IKeyValue, config?: IKeyValue) => CallbackWithBody<T>;

export type UseMethodWithoutBody = <T = any>(type: RequestTypeWithoutBody, method: string, params?: IKeyValue, config?: IKeyValue) => CallbackWithoutBody<T>;
export type UseMethodWithBody = <T = any>(type: RequestTypeWithBody, method: string, params?: IKeyValue, config?: IKeyValue) => CallbackWithBody<T>;

type MetaChecker = (response: AxiosResponse, checkMeta: boolean) => Promise<any>;

type HandlersWithoutBody = Record<RequestTypeWithoutBody, (path: string, config?: AxiosRequestConfig) => AxiosPromise>;
type HandlersWithBody = Record<RequestTypeWithBody, (path: string, data: any, config?: AxiosRequestConfig) => AxiosPromise>;

const handlersWithoutBody: HandlersWithoutBody = {
  get: getRequest,
  delete: deleteRequest
};

const handlersWithBody: HandlersWithBody = {
  post: postRequest,
  put: putRequest
};

export const buildQuery = (params: IKeyValue) =>
  Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`)

export const buildQueryString = (params: IKeyValue) => {
  const query = buildQuery(params);
  return query.length ? `?${query.join('&')}` : '';
};

const useApiConfig = (config: IKeyValue = {}) => {
  const { headers = {} } = config;

  const queryConfig = {
    ...config,
    headers: {
      ...headers,
      ...(isIE() ? { Pragma: 'no-cache' } : {})
    }
  }

  return {
    queryConfig,
    apiEndpoint: '/api/',
  }
}

export const useBuildUrl = (method: string, urlParams: IKeyValue, config: IKeyValue = {}) => {
  const { queryConfig, apiEndpoint } = useApiConfig(config);
  const queryParams: IKeyValue = { ...urlParams };

  const url = `${apiEndpoint}${method}${buildQueryString(queryParams)}`;
  return { url, queryConfig };
};

const runtimeUrl = (url: string, runtimeParams: IKeyValue) => {
  const runtimeQuery = buildQuery(runtimeParams);
  return runtimeQuery.length ?
    `${url}${url.includes('?') ? '&' : '?'}${runtimeQuery.join('&')}` :
    url;
};

const metaChecker: MetaChecker = async (response, checkMeta) => {
  if (checkMeta && response.data?.meta && isObject(response.data.meta)) {
    await checkMetaError(response.data.meta);
  }
};

export const useMethodWithoutBody: UseMethodWithoutBody = (handler, method, urlParams = {}, config = {}) => {
  const { queryConfig, url } = useBuildUrl(method, urlParams, config);

  return useCallback(async (runtimeParams= {}, checkMeta = true) => {
    const requestUrl = runtimeUrl(url, runtimeParams);
    const response = await handlersWithoutBody[handler](requestUrl, queryConfig);
    await metaChecker(response, checkMeta);
    return response;
  }, [url, handler, queryConfig]);
};

export const useMethodWithBody: UseMethodWithBody = (handler, method, urlParams = {}, config = {}) => {
  const { queryConfig, url } = useBuildUrl(method, urlParams, config);

  return useCallback(async (runtimePostParams = {}, runtimeUrlParams = {}, checkMeta = true) => {
    const requestUrl = runtimeUrl(url, runtimeUrlParams);
    const response = await handlersWithBody[handler](requestUrl, runtimePostParams, queryConfig);
    await metaChecker(response, checkMeta);
    return response;
  }, [url, handler, queryConfig]);
};

export const useApiGet: UseApiWithoutBody = (...args) =>
  useMethodWithoutBody('get', ...args);

export const useApiDelete: UseApiWithoutBody = (...args) =>
  useMethodWithoutBody('delete', ...args);

export const useApiPost: UseApiWithBody = (...args) =>
  useMethodWithBody('post', ...args);

export const useApiPut: UseApiWithBody = (...args) =>
  useMethodWithBody('put', ...args);
