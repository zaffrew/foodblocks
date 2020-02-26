const ACTIONS = {
    CACHE_RECIPE: 'CACHE_RECIPE',
    CACHE_SEARCH: 'CACHE_SEARCH'
}

const initialState = {
    recipes: {},
    searches: {},
}

function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.CACHE_RECIPE:
            const recipes = {...state.recipes}
            recipes[action.data.URL] = action.data
            return {...state, recipes}
        case ACTIONS.CACHE_SEARCH:
            const searches = state.searches
            searches[action.query] = action.searches
            return {...state, searches}
        default:
            return state;
    }
}


export {reducer, ACTIONS}
