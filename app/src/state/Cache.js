/*
 * This cache has the form {recipes, searches}.
 * recipes is a mapping from a URL to a recipe object.
 *
 * A recipe object consists of a thumbnail, which is data loaded from the search page to be displayed in a thumbnail, and regular recipe data.
 * See Scraper.js to see the format of a recipe object
 * thumbnail = {URL, img, title}
 *
 * searches is a mapping of search URLs to arrays of result URLs.
 */

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
