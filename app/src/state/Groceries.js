const ACTIONS = {
    SET_GROCERY: "SET_GROCERY",
    REMOVE_GROCERY: 'REMOVE_GROCERY',
    OVERWRITE_GROCERIES: 'OVERWRITE_GROCERIES'

};

/**
 * this reducer is rather stupid in that it simply sets the data given to it in the index it is given.
 * the actual state management is handled in Groceries.js
 */
function reducer(state = [], action) {
    if (action.type == ACTIONS.REMOVE_GROCERY) {
        state = state.slice()
        state.splice(action.index, 1)
        return state
    } else if (action.type === ACTIONS.SET_GROCERY) {
        state = state.slice();
        state[action.index] = {name: action.name, number: action.number};
        return state;
    } else if (action.type === ACTIONS.OVERWRITE_GROCERIES) {
        return action.data.slice()
    } else {
        return state;
    }
}

// const persistedReducer = persistReducer(persistConfig, reducer);
const persistedReducer = reducer;
export {persistedReducer as reducer, ACTIONS}
