const ACTIONS = {
    CACHE_RECIPE: 'CACHE_RECIPE',
    CACHE_SEARCH: 'CACHE_SEARCH',
};

const initialState = {
    recipes: {},
    searches: {},
};

function reducer(state = initialState, action) {
    if (action.type === ACTIONS.CACHE_RECIPE) {
        //this simply overwrites the old recipe that was there before
        return {...state, recipes: {...state.recipes, [action.recipe.URL]: action.recipe}}
    } else if (action.type === ACTIONS.CACHE_SEARCH) {
        //store the search results at the end of the array
        let searches = state.searches[action.searchRes.query];
        if (!searches) {
            searches = []
        }
        searches = [...searches, action.searchRes];

        return {...state, searches}
    } else {
        return state;
    }
}


export {reducer, ACTIONS}
