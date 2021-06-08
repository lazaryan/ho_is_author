import { ErrorDetailsState, ReadyErrorState, RootState } from 'reducers';

export const isPendingSelector = ({ readyErrorStates }: RootState): ReadyErrorState => readyErrorStates.pending;
export const isErrorSelector = ({ readyErrorStates }: RootState): ReadyErrorState => readyErrorStates.error;
export const isReadySelector = ({ readyErrorStates }: RootState): ReadyErrorState => readyErrorStates.ready;
export const errorDetailsSelector = ({ readyErrorStates }: RootState): ErrorDetailsState => readyErrorStates.errorDetails;
