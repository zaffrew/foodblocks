import {createTransform, persistReducer, persistStore} from "redux-persist";
import {combineReducers, createStore} from "redux";

import ACTIONS from "./ACTIONS";

import user_reducer from './UserInfo'
import groceries_reducer from './Groceries'
import cache_reducer from './Cache'
import list_reducer from './Lists'
import ratings_reducer from './Ratings'
import planned_foods_reducer from './PlannedFoods'
import {AsyncStorage} from "react-native";


const app_reducer = combineReducers({
    groceries: groceries_reducer,
    cache: cache_reducer,
    user_info: user_reducer,
    ratings: ratings_reducer,
    lists: list_reducer,
    planned_foods: planned_foods_reducer
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
    key: 'root',
    storage: AsyncStorage,
    // blacklist: ['cache'],
    transforms: [recipeTransform]
};

const persistedReducer = persistReducer(persistConfig, root_reducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export {store, persistor, ACTIONS}
