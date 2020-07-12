import ACTIONS from "./ACTIONS";

export default function reducer(state = {have: [], want: []}, action) {
    if (action.type === ACTIONS.ADD_WANT_GROCERY) {
        if(state.want.includes(action.grocery)) return state;
        return {...state, want: [...state.want, action.grocery]}
    } else if (action.type === ACTIONS.SET_WANT_GROCERIES) {
        return {...state, want: action.groceries}
    } else if (action.type === ACTIONS.REMOVE_WANT_GROCERY) {
        return {...state, want: state.want.filter(grocery => grocery !== action.grocery)}
    }

    else if (action.type === ACTIONS.ADD_HAVE_GROCERY) {
        if(state.have.includes(action.grocery)) return state;
        return {...state, have: [...state.have, action.grocery]}
    } else if (action.type === ACTIONS.SET_HAVE_GROCERIES) {
        return {...state, have: action.groceries}
    } else if (action.type === ACTIONS.REMOVE_HAVE_GROCERY) {
        return {...state, have: state.have.filter(grocery => grocery !== action.grocery)}
    }

    return state;
}
