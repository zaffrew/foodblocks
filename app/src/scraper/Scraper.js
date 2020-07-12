import {ACTIONS, store} from '../state/State'
import AllRecipes from "./websites/AllRecipes";
import Recipe from "./Recipe";
import Delish from './websites/Delish';
import INGREDIENT_PARSER from 'ingredients-parser'; //this library is dead for 3 years
import SearchResult from "./SearchResult";
import {executeNonBlocking} from "../utils/executeNonBlocking";

import {shallowEqualArrays} from "shallow-equal";
import simplifyFractions from "../utils/simplifyFractions";
import ignoreAfter from "../utils/ignoreAfter";


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
async function getSearch(query, filters, num = 20, source = SOURCES.ALL_RECIPES) {
    const searches = store.getState().cache.searches[query];
    let searchRes = searches ? searches.find(searchRes => {
            return searchRes.source === source && searchRes.results.length >= num && shallowEqualArrays(searchRes.filters, filters)
        }
    ) : null;

    if (searchRes) {
        return searchRes;
    }

    searchRes = new SearchResult(query, source, num, filters);
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

const currentlyLoadingRecipes = {}

//TODO: the idea is to break up any long running actions up into as many smaller parts so the UI can render whenever

//this returns a recipe and loads it if it has not already been loaded yet.
async function getRecipe(URL, thumbnail = false) {
    let recipe = store.getState().cache.recipes[URL];
    if (!recipe) {
        recipe = new Recipe(URL)
    }

    if (recipe.loaded.page || (thumbnail && recipe.loaded.thumbnail)) {
        return recipe
    }

    // this makes sure we're not loading more than one recipe at a time
    if (!currentlyLoadingRecipes[URL]) {
        currentlyLoadingRecipes[URL] = loadRecipe(recipe)
    }
    recipe = await currentlyLoadingRecipes[URL]
    delete currentlyLoadingRecipes[URL]


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

    //this should execute and not block rendering/navigation
    //using the js queue stops them from all running at the same time which makes it slower
    //TODO: it blocks far less than just doing "await scraper.scrape(recipe)" but its still slow
    //the actual scraping takes ~100-200ms
    await executeNonBlocking(() => scraper.scrape(recipe))

    //anything after the comma is unneeded
    recipe.cleanIngredients = recipe.ingredients.map(ingredient =>
        INGREDIENT_PARSER.parse(simplifyFractions(
            ignoreAfter(ingredient, [',']).trim())));
    return recipe;
}

export {SOURCES, getRecipe, getThumbnail, getSearch}
