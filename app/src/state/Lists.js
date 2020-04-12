import ACTIONS from './ACTIONS'

const initialState = [
    {name: 'dogs', URLs: []},
    {name: 'cats', URLs: []},
    {name: 'bats', URLs: []},
];

export default function reducer(state = initialState, action) {
    if (action.type === ACTIONS.CREATE_LIST) {
        return [{name: action.name, URLs: []}, ...state]
    } else if (action.type === ACTIONS.ADD_TO_LIST) {
        state.find(({name}) => action.name === name).URLs.push(action.URL)
        return [...state]; //we take the slice so it updates
    } else {
        return state;
    }
}
