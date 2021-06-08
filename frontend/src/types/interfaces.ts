import { IServerMetaStatus } from './types';

export interface IServerMeta {
  code: number;
  message?: string;
  status: IServerMetaStatus;
}

export interface IServerResponseData {
  meta: IServerMeta;
}

export interface IUserResponse extends IServerResponseData {
  data: IUser;
}

export interface IUser {
  auth: boolean;
  email?: string;
  name?: string;
  about?: string;
  photo?: string;
}

export interface ICard {
  name?: string;
  description?: string;
  path?: string;
  children?: ICard[];
}

export interface IHistory {
  entity_id?: string;
  name?: string;
  created?: string;
  description?: string;
  autors?: string;
  keywords?: string;
  cards?: ICard;
}

export interface IKeyValue<T = any> {
  [key: string]: T;
}

export interface IAction<T = any> {
  type: string | number;
  payload: T;
}
