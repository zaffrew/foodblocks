import URL_PARSE from "url-parse";
import {getDOM} from "./getDOM";
import moment from "moment";
import clean from "./clean";

const ORIGIN = 'https://www.delish.com/'

function getSearchURL(search) {
    const URL = new URL_PARSE(ORIGIN);
    URL.set('pathname', 'search/')
    URL.set('query', {q: search})
    return URL.href
}

/**
 * Returns the top URLs for the given search term on delish.com
 */
export async function search(search, num) {
    const searchURL = getSearchURL(search)
    return await getDOM(searchURL).then($ => {
        const res = []
        $('div.simple-item.grid-simple-item').each((i, e) => {
            if (i >= num) {
                return false
            }

            const path = $(e).children('a.simple-item-title.item-title').attr('href')
            const URL = new URL_PARSE(ORIGIN)
            URL.set('pathname', path)
            res.push(URL.href)
        })
        return res
    }).catch(err => {
        console.log('Error searching: ' + err)
    })
}

export async function getData(URL) {
    return await getDOM(URL).then($ => {
        const json = {URL}

        json['timeOfScrape'] = moment().toISOString();

        json['title'] = $('h1.content-hed.recipe-hed').text().trim()

        const directions = []
        $('.direction-lists').children('ol').children('li').each((i, e) => {
            directions.push($(e).text().trim())
        })
        json['directions'] = directions

        const ingredients = [];
        $('.ingredient-item').each((i, e) => {
            const amount = clean($(e).children('.ingredient-amount').text())
            const description = clean($(e).children('.ingredient-description').text())
            ingredients.push((amount ? amount + ' ' : '') + description)
        })
        json['ingredients'] = ingredients

        json['img'] = $('.recipe-body').find('img').attr('data-src')

        // $('li.prepTime__item').each((i, e) => {
        //     const timeElement = $(e).children('time')
        //     if (timeElement.length != 0) {
        //         json[timeElement.attr('itemprop').trim()] = timeElement.attr('datetime').trim()
        //     }
        // })
        //
        // json['description'] = $('.recipe-print__description').text().trim()
        //
        // $('.recipe-print__container2').children('div').each((i, e) => {
        //     const children = $(e).children('span')
        //     if (children.length == 2 && $(children[0]).attr('class') === 'recipe-print__by') {
        //         json['author'] = $(children[1]).text().trim()
        //         return false;
        //     }
        // });
        //
        // json['rating'] = $('.rating-stars').attr('data-ratingstars').trim()

        return json
    }).catch(err => {
        console.log('Error loading data: ' + err)
    })
}
