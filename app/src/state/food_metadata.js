import ACTIONS from "./ACTIONS";

export default function reducer(state = {}, action) {
    if (action.type === ACTIONS.ADD_METADATA) {
        return {
            ...state,
            [action.URL]: {
                ...state[action.URL],
                ...action.metadata,
            }
        }
    } else if (action.type === ACTIONS.REMOVE_METADATA) {
        delete state[action.URL]
        return state;
    }

    return state;
}
