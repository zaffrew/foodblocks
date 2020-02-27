const ACTIONS = {
    SET_GROCERY: "SET_GROCERY",
};

function reducer(state = [], action) {
    if (action.type === ACTIONS.SET_GROCERY) {
        state = state.slice();
        const addition = {name: action.name, number: action.number};
        const index = state.findIndex(grocery => {
            return grocery.name === action.name
        });
        if (index === -1) {
            state.push(addition)
        } else {
            state[index] = addition
        }
        return state;
    } else {
        return state;
    }
}

// const persistedReducer = persistReducer(persistConfig, reducer);
const persistedReducer = reducer;
export {persistedReducer as reducer, ACTIONS}
