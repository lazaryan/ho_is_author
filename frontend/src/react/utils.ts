import React, { useState, useEffect } from 'react';
import axios, { AxiosPromise } from 'axios'
import _max from 'lodash/max'
import { withRouter } from 'react-router-dom'

import { Theme } from 'theme/types'

export interface HistoryProps {
    history: Array<any>,
    location: { pathname: string, search: string, hash: string, state: any }
}

export interface ComponentInterface<T> {
    (props: T): React.FC,
    key?: any,
    Skeleton?: React.FC,
    [propName: string]: Function | React.FC
}

export interface CRUD<T> {
    create(props: T): Promise<any>,
    read(props: T): Promise<any>,
    update(props: T): Promise<any>,
    delete(props: T): Promise<any>,
}

export interface SearchCriteria {
    [propName: string]: string;
}

export type Dispatch = {
    type: string,
    payload: any,
    requestPayload: any
}

export type DispatchFn = (props: Dispatch) => any

export type ApiProps = {
    url: string,
    searchCriteria?: SearchCriteria,
    payload?: any,
    actionType?: string,
    dispatch?: DispatchFn
}

export type Import = () => Promise<any>

export const DELAY = 500

export const debouncedImport = (action: Import, delay = DELAY) => new Promise(resolve =>
	(start => action().then(response => setTimeout(() => resolve(response), _max([Date.now() - start, delay]))))(Date.now())
)

export class API implements CRUD<ApiProps> {
    create({ url, actionType, dispatch, payload }: ApiProps) {
        return this.handleResponse(axios.post(
            this.getUrl(url), payload
        ), actionType, dispatch, payload)
    }

    read({ url, searchCriteria, actionType, dispatch }: ApiProps) {
        return this.handleResponse(axios.get(
            searchCriteria ? this.applySearchCriteria(this.getUrl(url), searchCriteria) : this.getUrl(url)
        ), actionType, dispatch)
    }

    update({ url, actionType, dispatch, payload }: ApiProps) {
        return this.handleResponse(axios.put(
            this.getUrl(url), payload
        ), actionType, dispatch, payload)
    }

    delete({ url, actionType, dispatch, payload }: ApiProps) {
        return this.handleResponse(axios.delete(
            this.getUrl(url), payload
        ), actionType, dispatch, payload)
    }

    getUrl(url: string): string {
        return `${window.BASE_URL}${url}`
    }

    applySearchCriteria(url: string, searchCriteria: SearchCriteria) {
		return url.concat('?' +
			Object.entries(searchCriteria)
                .map(([criteria, value]) => `${criteria}=${value}`)
                .join('&')
        )
	}

    handleResponse(request: AxiosPromise, actionType: string, dispatch: DispatchFn, payload?: any): Promise<any> {
        return actionType && dispatch ?
            request.then(response => dispatch({ type: actionType, payload: response.data, requestPayload: payload })) :
            request
    }

    setToken(accessToken: string, refreshToken: string, getTokenUrl: string) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    
        this.setTokenUpdateInterceptor(refreshToken, getTokenUrl) // Update token if expired
    }

    setTokenUpdateInterceptor(refreshToken: string, getTokenUrl: string) {
        axios.interceptors.response.use(
            null,
            error => (
                console.error(error),
                error.response.status === 401 ?
                axios.post(getTokenUrl, { refresh: refreshToken })
                    .then(({ data: token }) => (
                        error.config.headers.Authorization = axios.defaults.headers.common['Authorization'] = `Bearer ${token}`,
                        axios.request(error.config)
                    ))
                : Promise.reject(error)
            )
        )
    }
}

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },

    [value]
  );

  return debouncedValue;
}