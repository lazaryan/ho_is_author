import commonRequest from 'helpers/commonRequest';
import { IAction, IUser, IUserResponse } from 'types/interfaces';
import { ApiGetExecutor, AsyncThunkAction } from 'types/types';

export enum UserActions {
  GET_USER = 'users_get_user',
}

export interface IUserAction extends IAction {
  type: UserActions
}

export const setUser = (payload: IUser) => ({
  type: UserActions.GET_USER,
  payload
})

export const getUser = (apiCall: ApiGetExecutor): AsyncThunkAction =>
  async dispatch =>
    commonRequest<IUserResponse>(dispatch, apiCall, 'user', async response => {
      const user = response.data;

      console.log(user)

      dispatch(setUser(user))
    })
