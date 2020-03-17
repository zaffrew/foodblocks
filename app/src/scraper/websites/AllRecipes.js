import {getDOM, text, genericScrape} from "../scraperUtils";
import {removeRepeatedWhitespace} from "../StringUtils";
import URL_PARSE from "url-parse";
import Recipe from "../Recipe";
import moment from "moment";

/**
 * Fills in the searchRes object and returns the recipes loaded.
 */
async function search(searchRes) {
    return await getDOM(getSearchURL(searchRes.query)).then($ => {
        const recipes = [];
        $('article.fixed-recipe-card').each((i, e) => {
            if (i >= searchRes.num) {
                return false;
            }

            const imgCard = $(e).find('.grid-card-image-container > a').first();

            const URL = imgCard.attr('href');
            const img = $(imgCard).children('img.fixed-recipe-card__img').first().attr('data-original-src');


            const title = $(e).find('.fixed-recipe-card__title-link').first().text().trim();


            const recipe = new Recipe(URL);
            recipe.image = img;
            recipe.name = title;
            recipe.loaded.thumbnail = moment().toISOString();
            recipes.push(recipe);
            searchRes.results.push(URL)
        });
        return recipes;
    })
}

async function scrape(recipe) {
    const $ = await getDOM(recipe.URL);

    //new: https://www.allrecipes.com/recipe/14169/mexican-bean-salad/
    //old: https://www.allrecipes.com/recipe/8358/apple-cake-iv/

    if ((recipe.name = text($('.intro')))) {
        old_scrape(recipe, $)
    } else if ((recipe.name = text($('#recipe-main-content')))) {
        new_scrape(recipe, $)
    } else {
        throw new Error('The page is not recognized as an allrecipe recipe page')
    }
    recipe.loaded.page = moment().toISOString();
}

//TODO: nutrition can be found at #nutrition

function old_scrape(recipe, $) {
    const locations = {
        ingredients: '.ingredients-section > .ingredients-item',
        author: '.author-name',
        description: '.recipe-summary',
        directions: '.instructions-section > .instructions-section-item > .section-body'
    };
    //skip image and do it later (custom)
    //skip time/servings too
    genericScrape(recipe, $, locations);

    recipe.image = $('.primary-media-section > .image-container > .lazy-image').attr('data-src');

    //time/servings
    const metaItems = [];
    $('.recipe-meta-item').each((i, e) => {
        metaItems.push(text($(e)))
    });
    metaItems.forEach(item => {
        const spl = item.split(':');
        const key = removeRepeatedWhitespace(spl[0].toLowerCase());
        const value = removeRepeatedWhitespace(spl[1]);

        if (key === 'servings') {
            recipe.servings = value;
        } else if (key === 'additional') {
            recipe.time.other = value;
        } else if (key === 'prep' || key === 'cook' || key === 'total') {
            recipe.time[key] = value;
        }
    })
}

function new_scrape(recipe, $) {
    const locations = {
        ingredients: '[itemprop=recipeIngredient]',
        directions: '.recipe-directions__list--item',
        author: '.submitter__name[itemprop=author]',
        description: '[itemprop=description]',
        servings: '[ng-bind=adjustedServings]'
    }
    genericScrape(recipe, $, locations)

    recipe.time.total = text($('.ready-in-time'))
    recipe.image = getHighResURL($('.rec-photo').attr('src'))
}

function getSearchURL(query) {
    const URL = new URL_PARSE('https://www.allrecipes.com/');
    URL.set('pathname', 'search/results/');
    URL.set('query', {wt: query});
    return URL.href
}

function getHighResURL(URL) {
    URL = new URL_PARSE(URL);
    //format is /userphotos/widthxheight/photonumber.jpg
    const split = URL.pathname.split('/')
    const path = split[1] + '/' + split[3];
    URL.set('pathname', path);
    return URL.href
}

export default {identifier: 'allrecipes.com', search, scrape}
