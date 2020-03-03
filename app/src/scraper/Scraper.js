import URL_PARSE from "url-parse";
import {getData as ALL_RECIPE_getData, search as ALL_RECIPE_search} from './AllRecipe'
import {getData as DELISH_getData, search as DELISH_search} from './Delish'
import {store, ACTIONS} from '../state/State'

const SOURCES = {
    ALL_RECIPE: 'www.allrecipes.com',
    DELISH: 'www.delish.com'
};

/**
 * Gets search results from a cache, or scrapes them if not already loaded.
 * @param query
 * @param num The number of results to return.
 * @param source
 * @returns {Promise<*>} A promise that will eventually return an array of URLs.
 */
async function search(query, num, source) {
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

/**
 * Gets data from a cache, or scrapes them if not already loaded.
 * @param URL The URL of the data.
 * @returns {Promise<*>} A data object of the following format.
 * data = {
 *     URL,
 *     img,
 *     title,
 *     ingredients,
 *     directions,
 *     author,
 *     description,
 *     prepTime,
 *     cookTime,
 *     totalTIme,
 *     source
 * }
 */
async function getData(URL) {
    const data = store.getState().cache.recipes[URL];
    if (data && data.loaded) {
        return data
    } else {
        store.dispatch({
            type: ACTIONS.CACHE_RECIPE,
            data: await loadData(URL)
        });
        return store.getState().cache.recipes[URL]
    }
}

async function loadData(URL) {
    URL = URL_PARSE(URL);
    if (URL.host.startsWith(SOURCES.ALL_RECIPE)) {
        return await ALL_RECIPE_getData(URL.href)
    } else if (URL.host.startsWith(SOURCES.DELISH)) {
        return await DELISH_getData(URL.href)
    }
}

async function getThumbnail(URL) {
    const recipe = store.getState().cache.recipes[URL]
    return recipe ? recipe.thumbnail : (await getData(URL)).thumbnail;
}

export {SOURCES, getData, search, getThumbnail}
