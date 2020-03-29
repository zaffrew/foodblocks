import {getDOM} from "./getDOM";
import moment from "moment";

import URL_PARSE from "url-parse";

const ORIGIN = "https://www.allrecipes.com";

function getPrintURL(URL) {
    URL = new URL_PARSE(URL);
    if (!URL.pathname.endsWith('print/')) {
        URL.set('pathname', URL.pathname + 'print/')
    }
    return URL.href
}


function getSearchURL(search) {
    const URL = new URL_PARSE(ORIGIN);
    URL.set('pathname', 'search/results/');
    URL.set('query', {wt: search});
    return URL.href
}

/**
 * Returns the top URLs for the given search term on allrecipes.com
 */
export async function search(search, num) {
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

export async function getData(URL) {
    const json = {URL};
    URL = getPrintURL(URL);

    return await getDOM(URL).then($ => {
        json['timeOfScrape'] = moment().toISOString();
        json['source'] = new URL_PARSE(URL).host;

        json['title'] = $('.recipe-print__title').text().trim();

        const directions = [];
        $('.recipe-print__directions').children('.item').each((i, e) => {
            directions.push($(e).text().trim())
        });
        json['directions'] = directions;

        const ingredients = [];
        $('.recipe-print__container2').children('ul').each((i, e) => {
            $(e).children('li').each((i, e) => {
                ingredients.push($(e).text().trim())
            })
        });
        json['ingredients'] = ingredients;

        json['img'] = $('img.recipe-print__recipe-img').attr('src');

        $('li.prepTime__item').each((i, e) => {
            const timeElement = $(e).children('time');
            if (timeElement.length !== 0) {
                json[timeElement.attr('itemprop').trim()] = timeElement.attr('datetime').trim()
            }
        });

        json['description'] = $('.recipe-print__description').text().trim();

        $('.recipe-print__container2').children('div').each((i, e) => {
            const children = $(e).children('span');
            if (children.length === 2 && $(children[0]).attr('class') === 'recipe-print__by') {
                json['author'] = $(children[1]).text().trim();
                return false;
            }
        });

        json['rating'] = $('.rating-stars').attr('data-ratingstars').trim();

        return json
    })
}