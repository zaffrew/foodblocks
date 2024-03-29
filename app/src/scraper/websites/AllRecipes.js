import {genericScrape, getDOM, getTime, text} from "../scraperUtils";
import {removeRepeatedWhitespace} from "../../utils/StringUtils";
import URL_PARSE from "url-parse";
import Recipe from "../Recipe";
import moment from "moment";

/**
 * Fills in the searchRes object and returns the recipes loaded.
 */
async function search(searchRes) {
    const recipes = await getDOM(getSearchURL(searchRes.query, searchRes.filters)).then($ => {
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

    searchRes.loaded = moment().toISOString();
    return recipes;
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
    recipe.source = "All Recipes"
}

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
            recipe.time.other = getTime(value, 'hr', 'min');
        } else if (key === 'prep' || key === 'cook' || key === 'total') {
            recipe.time[key] = getTime(value, 'hr', 'min');
        }
    });

    getNutrition(text($('.recipe-nutrition-section')), recipe)
    // scrapeNutrition($, recipe)
}

function new_scrape(recipe, $) {
    const locations = {
        ingredients: '[itemprop=recipeIngredient]',
        directions: '.recipe-directions__list--item',
        author: '.submitter__name[itemprop=author]',
        description: '[itemprop=description]',
        servings: '[ng-bind=adjustedServings]',
    };
    genericScrape(recipe, $, locations);

    getNutrition(text($('.nutrition-summary-facts')), recipe);
    // scrapeNutrition($, recipe)

    recipe.time.total = getTime(text($('.ready-in-time')), 'h', 'm')
    recipe.image = getHighResURL($('.rec-photo').attr('src'))
}

function getSearchURL(query, filters) {
    //this both adds certain ingredients to the excluded list and adds the name of the filter to the front.

    const excludedIngredients = []

    //&ingExcl=dairy,pork
    //is an example filter
    if (filters.includes('Dairy-free') || filters.includes('Vegan')) {
        excludedIngredients.push('dairy')
    }
    if (filters.includes('Gluten-free')) {
        excludedIngredients.push('gluten')
    }
    if (filters.includes('Vegan') || filters.includes('Vegetarian')) {
        excludedIngredients.push('meat')
    }
    if (filters.includes('Vegan')) {
        excludedIngredients.push('milk')
        excludedIngredients.push('egg')
    }

    query = filters.join(' ') + ' ' + query;

    const URL = new URL_PARSE('https://www.allrecipes.com/');
    URL.set('pathname', 'search/results/');
    URL.set('query', {wt: query, ingExcl: excludedIngredients.join(',')});

    return URL.href
}

function getHighResURL(URL) {
    URL = new URL_PARSE(URL);
    //format is /userphotos/widthxheight/photonumber.jpg
    const split = URL.pathname.split('/');
    const path = split[1] + '/' + split[3];
    URL.set('pathname', path);
    return URL.href
}

//Nutrition is all per serving
function getNutrition(str, recipe) {
    str = str.replace('Per Serving:', '');

    //it can be spelt any way
    str = str.replace('Full Nutrition', '');
    str = str.replace('Full nutrition', '');

    //theres a weird thing where it will seperate categories by ; but sodium is a .
    str = str.replace('sodium.', 'sodium;')

    str = removeRepeatedWhitespace(str);
    const categories = str.split(';');
    categories.forEach(fact => {
        if (fact) {
            //special case since total fat is two words:
            let key;
            if (fact.includes('total fat')) {
                key = 'total fat';
            } else {
                key = fact.split(' ').pop();
            }
            fact = removeRepeatedWhitespace(fact.replace(key, ''));
            recipe.nutrition[key.toLowerCase()] = fact;
        }
    })
}

//this doesnt work since the full nutrition modal is not a part of the scrapped html
function scrapeNutrition($, recipe) {
    recipe.calories = text($('.nutrition-top.light-underline')).split('Calories:').pop().trim();
    $('.nutrition-name').each((i, e) => {
        const textSplit = text($(e)).split(':');
        const key = textSplit[0].trim();
        const value = textSplit[1].trim();
        recipe.nutrition[key.toLowerCase().replace(' ', '-')] = value
    })
}

export default {identifier: 'allrecipes.com', search, scrape}
