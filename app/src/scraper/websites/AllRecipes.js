import {getDOM, text, genericScrape} from "../scraperUtils";
import {removeRepeatedWhitespace} from "../StringUtils";
import moment from "moment";
import URL_PARSE from "url-parse";

/**
 * Returns the top URLs for the given search term on allrecipes.com
 */
async function search(search, num) {
    return await getDOM(getSearchURL(search)).then($ => {
        const res = [];
        $('article.fixed-recipe-card').each((i, e) => {
            if (i >= num) {
                return false
            }

            const imgCard = $(e).find('.grid-card-image-container > a').first();

            const URL = imgCard.attr('href');
            const img = $(imgCard).children('img.fixed-recipe-card__img').first().attr('data-original-src');


            const title = $(e).find('.fixed-recipe-card__title-link').first().text().trim();

            res.push({URL, img, title})
        });
        return res
    })
}

async function scrape(recipe) {
    const $ = await getDOM(recipe.URL)

    //new: https://www.allrecipes.com/recipe/14169/mexican-bean-salad/
    //old: https://www.allrecipes.com/recipe/8358/apple-cake-iv/

    if ((recipe.name = text($('.intro')))) {
        old_scrape(recipe, $)
    } else if ((recipe.name = text($('#recipe-main-content')))) {
        // new_scrape(recipe, $)
    } else {
        throw new Error('The page is not recognized as an allrecipe recipe page')
    }
}

//nutrition can be found at #nutrition

function old_scrape(recipe, $) {
    const locations = {
        ingredients: '.ingredients-section > .ingredients-item',
        author: '.author-name',
        description: '.recipe-summary',
        directions: '.instructions-section > .instructions-section-item > .section-body'
    }
    //skip image and do it later (custom)
    //skip time/servings too
    genericScrape(recipe, $, locations)

    recipe.image = $('.primary-media-section > .image-container > .lazy-image').attr('data-src')

    //time/servings
    const metaItems = []
    $('.recipe-meta-item').each((i, e) => {
        metaItems.push(text($(e)))
    })
    metaItems.forEach(item => {
        const spl = item.split(':')
        const key = removeRepeatedWhitespace(spl[0].toLowerCase())
        const value = removeRepeatedWhitespace(spl[1])

        if (key === 'servings') {
            recipe.servings = value;
        } else if (key === 'additional') {
            recipe.time.other = value;
        } else if (key === 'prep' || key === 'cook' || key === 'total') {
            recipe.time[key] = value;
        }
    })
}

function getSearchURL(search) {
    const URL = new URL_PARSE(ORIGIN);
    URL.set('pathname', 'search/results/');
    URL.set('query', {wt: search});
    return URL.href
}

export default {identifier: 'allrecipes.com', search, scrape}
