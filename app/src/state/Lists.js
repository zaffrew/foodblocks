import ACTIONS from './ACTIONS'

export default function reducer(state = [], action) {
    if (action.type === ACTIONS.CREATE_LIST) {
        //if the list already exists then just return
        if (state.some(({name}) => name === action.name)) {
            return state;
        }
        return [{name: action.name, URLs: []}, ...state]
    } else if (action.type === ACTIONS.ADD_TO_LIST) {
        const list = state.find(({name}) => action.name === name);
        if (list.URLs.includes(action.URL)) return state;
        list.URLs.push(action.URL);
        return [...state];
    }
    return state;
}
