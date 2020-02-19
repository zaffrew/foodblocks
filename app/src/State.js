import {AsyncStorage} from "react-native";
import {persistReducer, persistStore} from "redux-persist";
import {createStore} from "redux";

const ACTIONS = {
    LOGOUT: 'LOGOUT',
    USERNAME: 'USERNAME',
    EMAIL: "EMAIL",
    UNSAVE_RECIPE: 'UNSAVE_RECIPE',
    SAVE_RECIPE: "SAVE_RECIPE",
    SET_GROCERY: "SET_GROCERY"
}

const initialState = {
    groceries: [],
    save: [],
}

function reducer(state, action) {
    if (action.type === ACTIONS.LOGOUT) {
        return initialState;
    } else if (action.type === ACTIONS.USERNAME) {
        return {...state, username: action.username};
    } else if (action.type === ACTIONS.EMAIL) {
        return {...state, email: action.email};
    } else if (action.type === ACTIONS.SAVE_RECIPE) {
        const save = state.recipe_save.slice()
        save.push(action.data);
        return {...state, recipe_save: save};
    } else if (action.type === ACTIONS.UNSAVE_RECIPE) {
        let save = state.recipe_save.slice()
        save = save.filter(data => {
            return data.URL !== action.data.URL
        })
        return {...state, recipe_save: save};
    } else if (action.type == ACTIONS.SET_GROCERY) {
        const addition = {name: action.name, number: action.number}
        const copy = state.groceries.slice()
        const index = copy.findIndex(grocery => {
            return grocery.name === action.name
        })
        if (index === -1) {
            copy.push(addition)
        } else {
            copy[index] = addition
        }

        return {...state, groceries: copy}
    }
    return state
}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['username', 'email', 'groceries', 'recipe_save']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, initialState);

const persistor = persistStore(store);

export {store, persistor, ACTIONS}
