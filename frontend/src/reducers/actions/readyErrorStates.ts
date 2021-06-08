import { AxiosError } from 'axios';
import { IAction } from 'types/interfaces';
import { AsyncThunkAction } from 'types/types';
import { getDescriptionFromError } from 'helpers/displayResponseError';

export enum ReadyErrorActions {
  SET_READY = 'set_ready',
  SET_PENDING = 'set_pending',
  SET_ERROR = 'set_error',
}

export type ReadyErrorPayload  = { key: string, state: boolean, errorDetails?: string}
export interface IReadyErrorAction<T = ReadyErrorPayload> extends IAction {
  type: ReadyErrorActions;
  payload: T;
}

export const setPendingState = (key: string, state: boolean) => ({
  type: ReadyErrorActions.SET_PENDING,
  payload: { state, key }
});

export const setReadyState = (key: string, state: boolean) => ({
  type: ReadyErrorActions.SET_READY,
  payload: { state, key }
});

export const setErrorState = (key: string, state: boolean, errorDetails: string = '') => ({
  type: ReadyErrorActions.SET_ERROR,
  payload: { state, key, errorDetails }
});

export const setSuccessState = (key: string): AsyncThunkAction =>
  async (dispatch) => {
    dispatch(setReadyState(key, true));
    dispatch(setPendingState(key, false));
    dispatch(setErrorState(key, false));
  };

export const setFailState = (key: string, error: AxiosError): AsyncThunkAction =>
  async (dispatch) => {
    dispatch(setPendingState(key, false));
    dispatch(setErrorState(key, true, getDescriptionFromError(error)));
  };

export const clearProcessStates = (key: string): AsyncThunkAction =>
  async (dispatch) => {
    dispatch(setReadyState(key, false));
    dispatch(setPendingState(key, false));
    dispatch(setErrorState(key, false));
  };
