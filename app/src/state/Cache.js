import ACTIONS from './ACTIONS'
import Recipe from "../scraper/Recipe";

const initialState = {
    recipes: {},
    searches: {},
};

export default function reducer(state = initialState, action) {
    if (action.type === ACTIONS.CACHE_RECIPE) {
        const old_recipe = state.recipes[action.URL]

        //TODO: this is much faster than the copying store version but it may not be the right way to do it
        state.recipes[action.recipe.URL] = {...old_recipe, ...action.recipe}
        return state
        //this simply overwrites the old recipe that was there before
        // return {...state, recipes: {...state.recipes, [action.recipe.URL]: action.recipe}}
    } else if (action.type === ACTIONS.CACHE_SEARCH) {
        //store the search results at the end of the array
        let searches = state.searches[action.searchRes.query];
        if (!searches) {
            searches = []
        }
        searches = [...searches, action.searchRes];

        return {...state, searches: {...state.searches, [action.searchRes.query]: searches}}
    } else if (action.type === ACTIONS.SAVE_RECIPE) {
        //this is implemented as a list and not a set as sets are not serialized properly
        state.recipes[action.URL].requiredBy.push('saved_recipes');
        return state;
    } else if (action.type === ACTIONS.UNSAVE_RECIPE) {
        state.recipes[action.URL].requiredBy = state.recipes[action.URL].requiredBy.filter(name => name !== 'saved_recipes')
        return state;
    } else if (action.type === ACTIONS.ADD_FOOD_HISTORY) {
        //the recipe can be added to the history without being loaded yet.
        if (!state.recipes[action.URL]) {
            state.recipes[action.URL] = new Recipe(action.URL);
        }

        const requiredBy = state.recipes[action.URL].requiredBy
        if (!requiredBy.includes('food_history')) {
            requiredBy.push('food_history');
        }
        return state;
    } else {
        return state;
    }
}
