import URL_PARSE from "url-parse";
import {getData as ALL_RECIPE_getData, search as ALL_RECIPE_search} from './AllRecipe'
import {getData as DELISH_getData, search as DELISH_search} from './Delish'

const SOURCES = {
    ALL_RECIPE: 'www.allrecipes.com',
    DELISH: 'www.delish.com'
}

async function search(query, num, source) {
    switch (source) {
        case SOURCES.ALL_RECIPE:
            return await ALL_RECIPE_search(query, num)
        case SOURCES.DELISH:
            return await DELISH_search(query, num)
    }
}

async function getData(URL) {
    URL = URL_PARSE(URL)
    if (URL.host.startsWith(SOURCES.ALL_RECIPE)) {
        return await ALL_RECIPE_getData(URL)
    } else if (URL.host.startsWith(SOURCES.DELISH)) {
        return await DELISH_getData(URL)
    }
}

export {SOURCES, getData, search}
