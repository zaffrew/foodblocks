import ACTIONS from "./ACTIONS";

export default function reducer(state = {}, action) {
    if (action.type === ACTIONS.PLAN_FOOD) {
        return {...state, [action.URL]: action.plan}
    } else if (action.type === ACTIONS.REMOVE_PLAN) {
        delete state[action.URL]
        return {...state};
    }

    return state;
}
