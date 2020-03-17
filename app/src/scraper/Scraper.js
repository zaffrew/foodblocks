import {store, ACTIONS} from '../state/State'
import AllRecipes from "./websites/AllRecipes";
import Recipe from "./Recipe";
import Delish from './websites/Delish'
import INGREDIENT_PARSER from 'ingredients-parser'

import SearchResult from "./SearchResult";

const SOURCES = {
    ALL_RECIPES: 'ALL_RECIPES',
    DELISH: 'DELISH',
};

const SCRAPERS = {
    [SOURCES.ALL_RECIPES]: AllRecipes,
    [SOURCES.DELISH]: Delish,
};

/**
 * Gets search results from a cache, or scrapes them if not already loaded.
 * @param query
 * @param num The number of results to return.
 * @param source
 * @returns {Promise<*>} A promise that will eventually return an array of URLs.
 */
async function search(query, num = 20, source = SOURCES.ALL_RECIPES) {
    //TODO: move this to somewhere better to cache search history
    // store.dispatch({
    //     type: ACTIONS.ADD_SEARCH_HISTORY,
    //     query,
    //     filters,
    //     time: moment().toISOString()
    // });

    const searches = store.getState().cache.searches[query];
    let searchRes = searches ? searches.find(searchRes => searchRes.source === source && searchRes.results.length >= num) : null;

    if (searchRes) {
        return searchRes;
    }

    searchRes = new SearchResult(query, source, num);
    //load the search
    await loadSearch(searchRes);

    //store it in redux
    store.dispatch({
        type: ACTIONS.CACHE_SEARCH,
        searchRes
    });

    return searchRes;
}

async function loadSearch(searchRes) {
    //do the scraping
    const recipes = await SCRAPERS[searchRes.source].search(searchRes);

    //store the recipes
    recipes.forEach(recipe => {
        store.dispatch({
            type: ACTIONS.CACHE_RECIPE,
            recipe
        });
    });
}

//this returns a recipe and loads it if it has not already been loaded yet.
async function getRecipe(URL, thumbnail = false) {
    let recipe = store.getState().cache.recipes[URL];
    if (!recipe) {
        recipe = new Recipe(URL)
    }

    if (recipe.loaded.page || (thumbnail && recipe.loaded.thumbnail)) {
        return recipe
    }


    //load the recipe
    recipe = await loadRecipe(recipe);
    //store it in redux
    store.dispatch({
        type: ACTIONS.CACHE_RECIPE,
        recipe
    });

    return recipe;
}

async function getThumbnail(URL) {
    return getRecipe(URL, true)
}

async function loadRecipe(recipe) {
    const scraper = Object.values(SCRAPERS).find(({identifier}) => recipe.URL.includes(identifier));
    if (!scraper) {
        throw new Error('Scraping from ' + recipe.URL + ' is not supported.')
    }

    await scraper.scrape(recipe);
    recipe.cleanIngredients = recipe.ingredients.map(ingredient => INGREDIENT_PARSER.parse(ingredient))

    return recipe;
}


export {SOURCES, getRecipe, getThumbnail, search}
