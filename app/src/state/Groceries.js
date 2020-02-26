import persistConfig from './PersistConfig'
import {persistReducer} from "redux-persist";


const ACTIONS = {
    SET_GROCERY: "SET_GROCERY",
}

function reducer(state = [], action) {
    switch(action.type) {
        case ACTIONS.SET_GROCERY:
            state = state.slice()
            const addition = {name: action.name, number: action.number}

            const index = state.findIndex(grocery => {
                return grocery.name === action.name
            })

            if (index === -1) {
                state.push(addition)
            } else {
                state[index] = addition
            }
            return state;
        default:
            return state;
    }
}

// const persistedReducer = persistReducer(persistConfig, reducer);
const persistedReducer = reducer
export {persistedReducer as reducer, ACTIONS}
