import { initialReadyErrorStates, IReadyErrorStates } from './index';
import { ReadyErrorActions, IReadyErrorAction, ReadyErrorPayload } from './actions/readyErrorStates';
import { IReducer } from 'types/types';

const reducers: IReducer<IReadyErrorStates, ReadyErrorPayload> = {
  [ReadyErrorActions.SET_READY]: (states, payload) => {
    const { key, state } = payload || {};
    const readyStates = states.ready;
    
    return { ...states, ready: { ...readyStates, [key]: state } };
  },
  [ReadyErrorActions.SET_PENDING]: (states, payload) => {
    const { key, state } = payload || {};
    const pendingStates = states.pending;

    return { ...states, pending: { ...pendingStates, [key]: state } };
  },
  [ReadyErrorActions.SET_ERROR]: (states, payload) => {
    const { key, state, errorDetails = '' } = payload || {};
    const errorStates = states.error;
    const errorDetailsStates = states.errorDetails;
    
    return {
      ...states,
      error: { ...errorStates, [key]: state },
      errorDetails: { ...errorDetailsStates, [key]: errorDetails }
    };
  }
}

const readyErrorsStatesReducer = (states: IReadyErrorStates = initialReadyErrorStates, action: IReadyErrorAction): IReadyErrorStates =>
  reducers[action.type] ? reducers[action.type](states, action.payload) : states;

export default readyErrorsStatesReducer;
