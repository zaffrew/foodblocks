import {persistReducer, persistStore} from "redux-persist";
import {combineReducers, createStore} from "redux";

import {reducer as user_reducer, STORES as user_store, ACTIONS as user_actions} from './UserInfo'
import {reducer as groceries_reducer, ACTIONS as groceries_actions} from './Groceries'
import {reducer as cache_reducer, ACTIONS as cache_actions} from './Cache'

import generalPersistConfig from './PersistConfig'

const ACTIONS = {
    ...user_actions,
    ...groceries_actions,
    ...cache_actions,
    RESET: 'RESET'
}

const STORES = {
    GROCERIES: 'GROCERIES',
    CACHE: 'CACHE',
    USER_INFO: 'USER_INFO',
}

const DEEP_STORES = {
    GROCERIES: STORES.GROCERIES,
    CACHE: STORES.CACHE,
    USERNAME: STORES.USER_INFO + '.' + user_store.USERNAME,
    EMAIL: STORES.USER_INFO + '.' + user_store.EMAIL
}

const PERSIST_STORES = [STORES.USER_INFO, STORES.GROCERIES]

const reducers = {}
reducers[STORES.GROCERIES] = groceries_reducer
reducers[STORES.CACHE] = cache_reducer
reducers[STORES.USER_INFO] = user_reducer

const app_reducer = combineReducers(reducers)

function root_reducer(state = {}, action) {
    if (action.type === ACTIONS.RESET) {
        return {};
    }
    return app_reducer(state, action)
}

const persistConfig = {
    ...generalPersistConfig,
    whitelist: PERSIST_STORES
}

const persistedReducer = persistReducer(persistConfig, root_reducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export {store, persistor, generalPersistConfig as persistConfig, DEEP_STORES as STORES, ACTIONS}
