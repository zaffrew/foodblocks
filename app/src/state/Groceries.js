/**
 * this reducer is rather stupid in that it simply sets the data given to it in the index it is given.
 * the actual state management is handled in Groceries.js
 */
import ACTIONS from "./ACTIONS";

export default function reducer(state = {have: [], need: []}, action) {
    if (action.type === ACTIONS.ADD_NEED_GROCERY) {
        return {...state, need: [...state.need, action.grocery]}
    }

    return state;
}
