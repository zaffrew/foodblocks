const ACTIONS = {
    CACHE_RECIPE: 'CACHE_RECIPE',
    CACHE_SEARCH: 'CACHE_SEARCH'
}

const STORES = {
    RECIPE_CACHE: 'RECIPE_CACHE',
    SEARCH_CACHE: 'SEARCH_CACHE',
}

const initialState = {}
initialState[STORES.RECIPE_CACHE] = {}
initialState[STORES.SEARCH_CACHE] = {}

function reducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.CACHE_RECIPE:
            const recipeCache = state[STORES.RECIPE_CACHE]
            recipeCache[action.data.URL] = action.data
            state[STORES.RECIPE_CACHE] = recipeCache
            break;
        case ACTIONS.CACHE_SEARCH:
            const searchCache = state[STORES.SEARCH_CACHE]
            searchCache[action.query] = action.URLs
            state[STORES.SEARCH_CACHE] = searchCache
            break;
    }

    return state
}


export {reducer, STORES, ACTIONS}
