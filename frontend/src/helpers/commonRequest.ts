import { ThunkDispatch } from 'redux-thunk';
import { RootState } from 'reducers';
import { AnyAction } from 'redux';
import { ApiGetExecutor } from 'types/types';
import { setFailState, setPendingState, setSuccessState } from 'reducers/actions/readyErrorStates';

type ICommonRequestWrapper = <T = any>(
  dispatch: ThunkDispatch<RootState, {}, AnyAction>,
  apiCall: ApiGetExecutor,
  key: string,
  onSuccess?: (data: T) => void | Promise<void>,
) => Promise<void>;

const commonRequest: ICommonRequestWrapper = async (dispatch, apiCall, key, onSuccess) => {
  dispatch(setPendingState(key, true));

  try {
    const { data } = await apiCall();
    if (onSuccess) {
      await onSuccess(data);
    }
    await dispatch(setSuccessState(key));
  } catch (error) {
    await dispatch(setFailState(key, error));
  } finally {
    dispatch(setPendingState(key, false));
  }
};

export default commonRequest;
