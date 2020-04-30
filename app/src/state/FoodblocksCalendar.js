import ACTIONS from "./ACTIONS";

export default function reducer(state = {}, action) {
    if (action.type === ACTIONS.ADD_EVENT) {
        return {...state, [action.URL]: {date: action.date, eventID: action.eventID, notificationID: action.notificationID}}
    } else if (action.type === ACTIONS.REMOVE_EVENT) {
        delete state[action.URL]
        return state;
    }

    return state;
}
