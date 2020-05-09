import ACTIONS from "./ACTIONS";

export default function reducer(state = [], action) {
    if (action.type === ACTIONS.ADD_METADATA) {
        const rating = action.metadata.rating;
        if (rating === 1 && !state.includes(action.URL)) {
            state = [action.URL, ...state]
        } else if (rating === 0 || rating === -1) {
            state = state.filter(URL => URL !== action.URL)
        }
        return state;
    }

    return state;
}
