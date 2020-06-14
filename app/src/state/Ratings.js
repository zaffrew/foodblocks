import ACTIONS from "./ACTIONS";

export default function reducer(state = {}, action) {
    if (action.type === ACTIONS.SET_RATING) {
        return {...state, [action.URL]: action.rating}
    }

    return state;
}
