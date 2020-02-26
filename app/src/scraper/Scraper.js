import URL_PARSE from "url-parse";
import {getData as ALL_RECIPE_getData, search as ALL_RECIPE_search} from './AllRecipe'
import {getData as DELISH_getData, search as DELISH_search} from './Delish'
import {store, ACTIONS} from '../state/State'

const SOURCES = {
    ALL_RECIPE: 'www.allrecipes.com',
    DELISH: 'www.delish.com'
}

async function search(query, num, source) {
    const searchRes = store.getState().cache.searches[query]
    if (searchRes) {
        return searchRes
    } else {
        store.dispatch({
            type: ACTIONS.CACHE_SEARCH,
            query,
            searches: await loadSearch(query, num, source)
        })
        return search(query, num, source)
    }
}

async function loadSearch(query, num, source) {
    switch (source) {
        case SOURCES.ALL_RECIPE:
            return await ALL_RECIPE_search(query, num)
        case SOURCES.DELISH:
            return await DELISH_search(query, num)
    }
}

async function getData(URL) {
    const data = store.getState().cache.recipes[URL]
    if (data) {
        return data
    } else {
        store.dispatch({
            type: ACTIONS.CACHE_RECIPE,
            data: await loadData(URL)
        })
        return getData(URL)
    }
}

async function loadData(URL) {
    URL = URL_PARSE(URL)
    if (URL.host.startsWith(SOURCES.ALL_RECIPE)) {
        return await ALL_RECIPE_getData(URL.href)
    } else if (URL.host.startsWith(SOURCES.DELISH)) {
        return await DELISH_getData(URL.href)
    }
}

export {SOURCES, getData, search}
