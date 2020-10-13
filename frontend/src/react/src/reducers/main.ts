import update from 'immutability-helper'


export interface Store {}

export const initialState: Store = {}

export const reducers = {}

export default (state = initialState, action) =>
  reducers[action.type] ? update(state, reducers[action.type](action.payload, state, action.requestPayload)) : state
