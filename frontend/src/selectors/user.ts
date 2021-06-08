import { RootState } from 'reducers';
import { IUser } from 'types/interfaces'

export const userSelector = ({ user }: RootState): IUser => user;

export const authSelector = ({ user }: RootState): boolean => user.auth;
