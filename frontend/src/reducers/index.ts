import { combineReducers } from 'redux';
import readyErrorStates from './readyErrorStates';
import user from './user';
import { IUser } from 'types/interfaces';

export type ReadyErrorState = { [key: string]: boolean }
export type ErrorDetailsState = { [key: string]: string }
export type ReadyErrorStateKey = 'ready' | 'error' | 'pending';
export type IReadyErrorStates = {
  [key in ReadyErrorStateKey]: ReadyErrorState;
} & {
  errorDetails: ErrorDetailsState
}

const readyErrorPendingStates: ReadyErrorState = {
  user: false,
}

export const initialReadyErrorStates: IReadyErrorStates = {
  ready: readyErrorPendingStates,
  error: readyErrorPendingStates,
  pending: readyErrorPendingStates,
  errorDetails: Object.keys(readyErrorPendingStates).reduce((r, k) => ({ ...r, [k]: '' }), {})
}

export interface IState {
  readyErrorStates: IReadyErrorStates;
  user: IUser;
}

export const initialState: IState = {
  readyErrorStates: initialReadyErrorStates,
  user: { auth: false },
}

const rootReducer = combineReducers({
  readyErrorStates,
  user,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
