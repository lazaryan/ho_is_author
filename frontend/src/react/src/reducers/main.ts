import update from 'immutability-helper'
import {
  GET_USER
} from '../actions/main/types'

export interface Store {
  status: boolean,
  user?: {
    email: string,
    name?: string
  }
}

export const initialState: Store = {
  status: false
}

export const reducers = {
  [GET_USER]: (payload: Store) => ({ $merge: payload }),
}

export default (state = initialState, action) =>
  reducers[action.type] ? update(state, reducers[action.type](action.payload, state, action.requestPayload)) : state
