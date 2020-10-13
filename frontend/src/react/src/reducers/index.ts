import { combineReducers } from 'redux'

import main, { Store as MainStore } from './main'

export interface Store {
    main: MainStore;
}

export default combineReducers({ main })
