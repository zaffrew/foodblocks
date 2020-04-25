import {persistReducer, persistStore} from "redux-persist";
import {combineReducers, createStore} from "redux";

import {reducer as user_reducer, ACTIONS as user_actions} from './UserInfo'
import {reducer as groceries_reducer, ACTIONS as groceries_actions} from './Groceries'
import {reducer as cache_reducer, ACTIONS as cache_actions} from './Cache'
import {reducer as saved_reducer, ACTIONS as saved_actions} from './SavedRecipes'
import {reducer as calendar_reducer, ACTIONS as calendar_actions} from './FoodblocksCalendar'

import generalPersistConfig from './PersistConfig'

const ACTIONS = {
    ...user_actions,
    ...groceries_actions,
    ...cache_actions,
    ...saved_actions,
    ...calendar_actions,
    RESET: 'RESET'
};

const app_reducer = combineReducers({
    groceries: groceries_reducer,
    cache: cache_reducer,
    user_info: user_reducer,
    saved_recipes: saved_reducer,
    calendar: calendar_reducer,
});

function root_reducer(state = {}, action) {
    if (action.type === ACTIONS.RESET) {
        //this forces app_reducer to restore the initial states
        state = {}
    }
    return app_reducer(state, action)
}

const persistConfig = {
    ...generalPersistConfig,
    blacklist: ['cache']
};

const persistedReducer = persistReducer(persistConfig, root_reducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export {store, persistor, ACTIONS}
