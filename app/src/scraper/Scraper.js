import URL_PARSE from "url-parse";
import {scrape as ALL_RECIPE_getData, search as ALL_RECIPE_search} from './websites/AllRecipes'
import {getData as DELISH_getData, search as DELISH_search} from './Delish'
import {store, ACTIONS} from '../state/State'
import AllRecipes from "./websites/AllRecipes";
import Recipe from "./Recipe";

import moment from "moment";

const SOURCES = {
    ALL_RECIPE: 'www.allrecipes.com',
    DELISH: 'www.delish.com'
};

const SCRAPERS = [
    AllRecipes,
]

/**
 * Gets search results from a cache, or scrapes them if not already loaded.
 * @param query
 * @param num The number of results to return.
 * @param source
 * @returns {Promise<*>} A promise that will eventually return an array of URLs.
 */
async function search(query, filters = [], num = 20, source = SOURCES.ALL_RECIPE) {
    store.dispatch({
        type: ACTIONS.ADD_SEARCH_HISTORY,
        query,
        filters,
        time: moment().toISOString()
    })

    let searchRes = store.getState().cache.searches[query];
    if (searchRes) {
        return searchRes
    } else {
        store.dispatch({
            type: ACTIONS.CACHE_SEARCH,
            query,
            searches: await loadSearch(query, num, source)
        });
        return store.getState().cache.searches[query]
    }
}

async function loadSearch(query, num, source) {
    switch (source) {
        case SOURCES.ALL_RECIPE:
            return await ALL_RECIPE_search(query, num);
        case SOURCES.DELISH:
            return await DELISH_search(query, num)
    }
}

async function getData(URL) {
    const recipe = store.getState().cache.recipes[URL];
    if (recipe && recipe.loaded.page) {
        return recipe
    } else {
        store.dispatch({
            type: ACTIONS.CACHE_RECIPE,
            recipe: await loadRecipe(URL)
        });
        return store.getState().cache.recipes[URL]
    }
}

async function loadRecipe(URL) {
    const recipe = new Recipe(URL);
    recipe.timeOfScrape = moment().toISOString();
    await SCRAPERS.find(({identifier}) => URL.contains(identifier)).scrape(recipe);
    recipe.loaded.page = true;
    return recipe
}

async function getThumbnail(URL) {
    const recipe = store.getState().cache.recipes[URL]
    return recipe ? recipe.thumbnail : (await getData(URL)).thumbnail;
}

export {SOURCES, getData, search, getThumbnail}
