import {createTransform, persistReducer, persistStore} from "redux-persist";
import {combineReducers, createStore} from "redux";

import UserInfo from './UserInfo'
import Groceries from './Groceries'
import Cache from './Cache'
import SavedRecipes from './SavedRecipes'

import PersistStorage from './PersistStorage'


const sub_reducers = [Groceries, Cache, SavedRecipes, UserInfo]

const ACTIONS = {
    RESET: 'RESET'
};
sub_reducers.forEach(reducer => {
    for (const [key, value] of Object.entries(reducer.actions)) {
        ACTIONS[key] = value
    }
})

function reducer(state = {}, action) {
    if (action.type === ACTIONS.RESET) {
        //this forces the sub reducers to restore the initial states
        state = {}
    }

    const new_state = {}
    sub_reducers.forEach(reducer => {
        new_state[reducer.sub_store_name] = reducer.reducer(state[reducer.sub_store_name], action)
    })

    return {...state, ...new_state}
}

// const persistTransform = createTransform(
//     // transform state on its way to being serialized and persisted.
//     (inboundState, key) => {
//         console.log(key, inboundState)
//         return inboundState;
//
//         const inboundCache = inboundState.cache;
//         const recipes = Object.keys(inboundCache.searches).filter(key =>
//             inboundCache.persist_recipes.contains(key)
//         ).reduce((obj, key) =>
//             ({...obj, [key]: inboundCache.searches[key]})
//         )
//
//         return {...inboundState, cache: {...inboundCache, recipes}}
//     }
// );

const persistConfig = {
    key: 'root',
    storage: PersistStorage,
    // transforms: [persistTransform],
    blacklist: ['cache']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export {store, persistor, ACTIONS}
