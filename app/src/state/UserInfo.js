import settings from '../../settings/appSettings'
import {interpolate} from "react-native-reanimated";

const ACTIONS = {
    USERNAME: 'USERNAME',
    EMAIL: "EMAIL",
    SET_FILTER: 'SET_FILTER',
    ADD_SEARCH_HISTORY: 'ADD_SEARCH_HISTORY'
};

const initalFilters = settings.defaultFilters.map(name => ({name, active: false}))
const initialState = {filters: initalFilters, search_history: []}

//i dont know why but for some reason we cant set state={filters: initialFilters}. maybe since it will be changed every time?

function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.USERNAME:
            return {...state, username: action.username};
        case ACTIONS.EMAIL:
            return {...state, email: action.email};
        case ACTIONS.SET_FILTER:
            const filters = state.filters.map(filter => {
                return filter.name === action.name ? {name: action.name, active: action.active} : filter
            })
            return {...state, filters}
        case ACTIONS.ADD_SEARCH_HISTORY:
            return {...state, filters: [...state.filters, {query: action.query, filters: action.filters, time: action.time}]}
        default:
            return state
    }
}

// const persistedReducer = persistReducer({...persistConfig, whitelist: Object.values(STORES)}, reducer);
const persistedReducer = reducer;
export {persistedReducer as reducer, ACTIONS}
