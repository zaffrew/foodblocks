import URL_PARSE from "url-parse";
import {genericScrape, getDOM} from "../scraperUtils";
import Recipe from "../Recipe";
import moment from "moment";

/**
 * Returns the top URLs for the given search term on delish.com
 */
export async function search(searchRes) {
    const searchURL = getSearchURL(searchRes.query);
    return await getDOM(searchURL).then($ => {
        const recipes = [];
        $('div.simple-item.grid-simple-item').each((i, e) => {
            if (i >= searchRes.num) {
                return false
            }

            const titleElement = $(e).children('a.simple-item-title.item-title');
            const path = titleElement.attr('href');
            const URL = new URL_PARSE(ORIGIN);
            URL.set('pathname', path);

            //some links are food news etc
            //TODO: some links that start with cooking aren't proper recipes but rather lists.
            if (URL.pathname.startsWith('/cooking')) {
                const title = titleElement.text().trim();

                const img = $(e).children('a.simple-item-image.item-image').first().children('span').first().attr('data-lqip');
                const imgURL = new URL_PARSE(img);
                imgURL.set('query', '');


                const recipe = new Recipe(URL);
                recipe.image = img;
                recipe.name = title;
                recipe.loaded.thumbnail = moment().toISOString();
                recipes.push(recipe);
                searchRes.results.push(URL)
            }
        });
        return recipes
    })
}

async function scrape(recipe) {
    const $ = await getDOM(recipe.URL);

    const instructions = {
        name: 'h1.content-hed.recipe-hed',
        author: 'span.byline-name',
        description: '.recipe-introduction',
        yields: '.recipe-details-item.yields',
        ingredients: '.ingredient-item',
        directions: '.direction-lists  li',
        time: {
            prep: '.prep-time-amount',
            total: '.total-time-amount',
        }
    };
    genericScrape(recipe, $, instructions);

    recipe.image = $('.recipe-body img').attr('data-src');

    recipe.loaded.page = moment().toISOString();
}

function getSearchURL(search) {
    const URL = new URL_PARSE('https://www.delish.com/');
    URL.set('pathname', 'search/');
    URL.set('query', {q: search});
    return URL.href
}

export default {identifier: 'delish.com', search, scrape}
