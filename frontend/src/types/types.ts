import { Dispatch, SetStateAction } from 'react';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { AxiosPromise } from 'axios';
import { Spec } from 'immutability-helper';
import { RootState } from 'reducers';

export type IServerMetaStatus = 'OK' | 'ERROR';

export type AsyncThunkAction<T = void> = ThunkAction<Promise<T>, RootState, {}, AnyAction>;
export type SyncThunkAction<T = void> = ThunkAction<T, RootState, {}, AnyAction>;

export type ApiGetExecutor<T = any, R = any> = (runTimeParams?: T) => AxiosPromise<R>;

export type IReducer<T, K = any> = {
  [key: string]: (state: T, payload: K) => T;
}
  
export type IImmutableReducer<T, K = any> = {
  [key: string]: (state: T, payload: K) => Spec<T, never>
}

export type ReducerAction<T = any> = (oldState: T) => T;

export type Reducer<T = any> = Dispatch<SetStateAction<T>>;
