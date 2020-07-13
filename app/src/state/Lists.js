import ACTIONS from './ACTIONS'

export default function reducer(state = {lists: {}, order: []}, action) {
    if (action.type === ACTIONS.CREATE_LIST) {
        //if the list already exists then just return
        if (state.lists[action.name]) return state;

        return {lists: {...state.lists, [action.name]: []}, order: [...state.order, action.name]}
    } else if (action.type === ACTIONS.ADD_TO_LIST) {
        if (state.lists[action.name].includes(action.URL)) return state;

        return {...state, lists: {...state.lists, [action.name]: [...state.lists[action.name], action.URL]}}
    }
    return state;
}
