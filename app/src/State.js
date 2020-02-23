import {AsyncStorage} from "react-native";
import {persistReducer, persistStore} from "redux-persist";
import {createStore} from "redux";

const ACTIONS = {
    LOGOUT: 'LOGOUT',
    USERNAME: 'USERNAME',
    EMAIL: "EMAIL",
    UNSAVE_RECIPE: 'UNSAVE_RECIPE',
    SAVE_RECIPE: "SAVE_RECIPE",
    SET_GROCERY: "SET_GROCERY",
    CACHE_RECIPE: 'CACHE_RECIPE',
    CACHE_SEARCH: "CACHE_SEARCH"
}

const STORES = {
    SAVED_RECIPES: 'SAVED_RECIPES',
    USERNAME: 'USERNAME',
    EMAIL: 'EMAIL',
    GROCERIES: 'GROCERIES',
    RECIPE_CACHE: 'CACHED_RECIPES',
    SEARCH_CACHE: 'CACHED_SEARCHES'
}

const PERSIST_STORES = [STORES.SAVED_RECIPES, STORES.USERNAME, STORES.EMAIL, STORES.GROCERIES]

const initialState = {}
initialState[STORES.SAVED_RECIPES] = []
initialState[STORES.GROCERIES] = []
initialState[STORES.RECIPE_CACHE] = {}
initialState[STORES.SEARCH_CACHE] = {}

function reducer(state, action) {
    if (action.type === ACTIONS.LOGOUT) {
        return initialState;
    } else if (action.type === ACTIONS.USERNAME) {
        const newState = {...state}
        newState[STORES.USERNAME] = action.username
        return newState
    } else if (action.type === ACTIONS.EMAIL) {
        const newState = {...state}
        newState[STORES.EMAIL] = action.email
        return newState
    } else if (action.type === ACTIONS.SAVE_RECIPE) {
        const save = state[STORES.SAVED_RECIPES].slice()
        save.push(action.URL);
        const newState = {...state}
        newState[STORES.SAVED_RECIPES] = save
        return newState
        return {...state, recipe_save: save};
    } else if (action.type === ACTIONS.UNSAVE_RECIPE) {
        let save = state[STORES.SAVED_RECIPES].slice()
        save = save.filter(URL => {
            return URL !== action.URL
        })

        const newState = {...state}
        newState[STORES.SAVED_RECIPES] = save
        return newState
    } else if (action.type === ACTIONS.SET_GROCERY) {
        const addition = {name: action.name, number: action.number}
        const copy = state[STORES.GROCERIES].slice()
        const index = copy.findIndex(grocery => {
            return grocery.name === action.name
        })
        if (index === -1) {
            copy.push(addition)
        } else {
            copy[index] = addition
        }

        const newState = {...state}
        newState[STORES.GROCERIES] = copy
        return newState
    } else if (action.type === ACTIONS.CACHE_RECIPE) {
        const RECIPE_CACHE = {...state[STORES.RECIPE_CACHE]}
        const URL = action.data.URL
        RECIPE_CACHE[URL] = action.data
        const newState = {...state}
        newState[STORES.RECIPE_CACHE] = RECIPE_CACHE
        return newState
    } else if (action.type === ACTIONS.CACHE_SEARCH) {
        const SEARCH_CACHE = {...state[STORES.SEARCH_CACHE]}
        SEARCH_CACHE[action.query] = action.data

        const newState = {...state}
        newState[STORES.SEARCH_CACHE] = SEARCH_CACHE
        return newState
    }
    return state
}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: PERSIST_STORES
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, initialState);

const persistor = persistStore(store);

export {store, persistor, ACTIONS, STORES}
