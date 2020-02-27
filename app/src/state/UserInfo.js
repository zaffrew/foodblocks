const ACTIONS = {
    USERNAME: 'USERNAME',
    EMAIL: "EMAIL",
};


function reducer(state = {}, action) {
    switch (action.type) {
        case ACTIONS.USERNAME:
            return {...state, username: action.username};
        case ACTIONS.EMAIL:
            return {...state, email: action.email};
        default:
            return state
    }
}

// const persistedReducer = persistReducer({...persistConfig, whitelist: Object.values(STORES)}, reducer);
const persistedReducer = reducer;
export {persistedReducer as reducer, ACTIONS}
