import persistConfig from './PersistConfig'
import {persistReducer} from "redux-persist";


const ACTIONS = {
    SET_GROCERY: "SET_GROCERY",
}

function reducer(state = [], action) {
    if (action.type === ACTIONS.SET_GROCERY) {
        const addition = {name: action.name, number: action.number}

        const index = state.findIndex(grocery => {
            return grocery.name === action.name
        })

        if (index === -1) {
            state.push(addition)
        } else {
            state[index] = addition
        }
    }

    return state
}

const persistedReducer = persistReducer(persistConfig, reducer);

export {persistedReducer as reducer, ACTIONS}
