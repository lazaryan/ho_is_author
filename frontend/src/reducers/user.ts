import { UserActions, IUserAction } from 'reducers/actions/user';
import { IUser } from 'types/interfaces';
import { IReducer } from 'types/types';

const reducers: IReducer<IUser> = {
  [UserActions.GET_USER]: (state, payload: IUser) => ({ ...state, ...payload }),
}

const userReducer = (policies: IUser = { auth: false }, action: IUserAction): IUser =>
  reducers[action.type] ? reducers[action.type](policies, action.payload) : policies;

export default userReducer;
