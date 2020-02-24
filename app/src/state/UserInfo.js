import persistConfig from './PersistConfig'
import {persistReducer} from "redux-persist";

const STORES = {
    USERNAME: 'USERNAME',
    EMAIL: 'EMAIL',
}

const ACTIONS = {
    USERNAME: 'USERNAME',
    EMAIL: "EMAIL",
}

const PERSIST_STORES = [STORES.USERNAME, STORES.EMAIL]

const initialState = {}

function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.USERNAME:
            state[STORES.USERNAME] = action.username
            break;
        case ACTIONS.EMAIL:
            state[STORES.EMAIL] = action.email
            break;
    }
    return state
}

const persistedReducer = persistReducer(persistConfig, reducer);

export {persistedReducer as reducer, STORES, ACTIONS}
