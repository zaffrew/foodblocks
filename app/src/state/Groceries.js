import createSubReducer from "./createSubReducer";

/**
 * this reducer is rather stupid in that it simply sets the data given to it in the index it is given.
 * the actual state management is handled in Groceries.js
 */
function reducer(state = [], action) {
    if (action.type === ACTIONS.REMOVE_GROCERY) {
        state = state.slice();
        state.splice(action.index, 1);
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

const subReducer = createSubReducer(reducer, 'groceries', {
    SET_GROCERY: "SET",
    REMOVE_GROCERY: 'REMOVE',
    OVERWRITE_GROCERIES: 'OVERWRITE'
})

const ACTIONS = subReducer.actions

export default subReducer
