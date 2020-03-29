import settings from '../../settings/appSettings'
import ACTIONS from "./ACTIONS";

const initalFilters = settings.defaultFilters.map(name => ({name, active: false}));
const initialState = {filters: initalFilters, search_history: [], food_history: []};

//i dont know why but for some reason we cant set state={filters: initialFilters}. maybe since it will be changed every time?

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.USERNAME:
            return {...state, username: action.username};
        case ACTIONS.EMAIL:
            return {...state, email: action.email};
        case ACTIONS.SET_FILTER:
            const filters = state.filters.map(filter => {
                return filter.name === action.name ? {name: action.name, active: action.active} : filter
            });
            return {...state, filters};
        case ACTIONS.ADD_SEARCH_HISTORY:
            return {
                ...state,
                search_history: [action.searchRes, ...state.search_history]
            };
        case ACTIONS.ADD_FOOD_HISTORY:
            return {
                ...state,
                food_history: [{
                    URL: action.URL,
                    time: action.time,
                }, ...state.food_history]
            };
        default:
            return state
    }
}
