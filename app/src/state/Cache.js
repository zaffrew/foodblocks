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
    CACHE_SEARCH: 'CACHE_SEARCH'
}

const initialState = {
    recipes: {},
    searches: {},
}

function reducer(state = initialState, action) {
    if (action.type === ACTIONS.CACHE_RECIPE) {
        const URL = action.data.URL
        const recipeState = {...state.recipes}
        const recipeData = {...recipeState[URL], ...action.data, loaded: true}
        recipeState[URL] = recipeData

        return {...state, recipes: recipeState}
    } else if (action.type === ACTIONS.CACHE_SEARCH) {
        const recipeState = {...state.recipes}
        const searchResults = []

        action.searches.forEach(search => {
            recipeState[search.URL] = {
                ...recipeState[search.URL],
                thumbnail: {URL: search.URL, img: search.img, title: search.title}
            }

            searchResults.push(search.URL)
        })


        const searchState = {...state.searches}
        searchState[action.query] = searchResults
        return {recipes: recipeState, searches: searchState}
    } else {
        return state;
    }
}


export {reducer, ACTIONS}
