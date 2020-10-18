import { API, DispatchFn } from 'utils'
import {
    GET_USER
} from './types'

export const getState = (actionType = GET_USER) =>
    (dispatch: DispatchFn) => new API().read({ url: '/api/user', actionType, dispatch })
