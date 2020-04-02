import {createTransform, persistReducer, persistStore} from "redux-persist";
import {combineReducers, createStore} from "redux";

import ACTIONS from "./ACTIONS";

import user_reducer from './UserInfo'
import groceries_reducer from './Groceries'
import cache_reducer from './Cache'
import saved_reducer from './SavedRecipes'

import generalPersistConfig from './PersistConfig'
import {createFilter, persistFilter} from "redux-persist-transform-filter";

const app_reducer = combineReducers({
    groceries: groceries_reducer,
    cache: cache_reducer,
    user_info: user_reducer,
    saved_recipes: saved_reducer
});

function root_reducer(state = {}, action) {
    if (action.type === ACTIONS.RESET) {
        //this forces app_reducer to restore the initial states
        state = {}
    }
    return app_reducer(state, action)
}

//this saves only the recipes that need saving
const recipeTransform = createTransform(
    (inboundState, key) => {
        const filteredRecipes = {}
        for (const [URL, recipe] of Object.entries(inboundState.recipes)) {
            if (recipe.requiredBy) {
                filteredRecipes[URL] = recipe
            }
        }

        return {
            ...inboundState,
            recipes: filteredRecipes
        }
    },
    (outboundState, key) => {
        return outboundState
    },
    {whitelist: ['cache']}
)

const persistConfig = {
    ...generalPersistConfig,
    // blacklist: ['cache'],
    transforms: [recipeTransform]
};

const persistedReducer = persistReducer(persistConfig, root_reducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export {store, persistor, ACTIONS}
