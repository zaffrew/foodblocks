import {AsyncStorage} from "react-native";
import {persistReducer, persistStore} from "redux-persist";
import {createStore} from "redux";

const ACTIONS = {
    LOGOUT: 'LOGOUT',
    USERNAME: 'USERNAME',
    EMAIL: "EMAIL",
    UNSAVE_RECIPE: 'UNSAVE_RECIPE',
    SAVE_RECIPE: "SAVE_RECIPE"
}

function reducer(state, action) {
    if (action.type === ACTIONS.LOGOUT) {
        return {};
    } else if (action.type === ACTIONS.USERNAME) {
        return {...state, username: action.username};
    } else if (action.type === ACTIONS.EMAIL) {
        return {...state, email: action.email};
    } else if (action.type === ACTIONS.SAVE_RECIPE) {
        const save = state.save ? state.save.slice() : [];
        save.push(action.data);
        return {...state, recipe_save: save};
    } else if (action.type === ACTIONS.UNSAVE_RECIPE) {
        let save = state.save ? state.save.slice() : [];
        save = save.filter(data => {
            data.URL !== action.data.URL
        })
        return {...state, recipe_save: save};
    } else {
        return state
    }
}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['username', 'email']
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer);

const persistor = persistStore(store);

export {store, persistor, ACTIONS}
