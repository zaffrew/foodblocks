const ACTIONS = {
    ADD_EVENT: "ADD_EVENT",
    REMOVE_EVENT: 'REMOVE_EVENT'
};

function reducer(state = {}, action) {
    if (action.type === ACTIONS.ADD_EVENT) {
        return {...state, [action.URL]: {date: action.date, eventID: action.eventID}}
    } else if (action.type === ACTIONS.REMOVE_EVENT) {
        delete state[action.URL]
        return state;
    }

    return state;
}

const persistedReducer = reducer;
export {persistedReducer as reducer, ACTIONS}
