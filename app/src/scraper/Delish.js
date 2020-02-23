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
            if (res.length >= num) {
                return false
            }

            const path = $(e).children('a.simple-item-title.item-title').attr('href')
            const URL = new URL_PARSE(ORIGIN)
            URL.set('pathname', path)

            //some links are food news etc
            if (URL.pathname.startsWith('/cooking')) {
                res.push(URL.href)
            }
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
        json['source'] = new URL_PARSE(URL).host

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

        json['serving'] = clean($('.yields-amount').text())

        json['prepTime'] = getTime($, '.prep-time-amount')
        json['totalTime'] = getTime($, '.total-time-amount')


        json['description'] = $('.recipe-introduction > p').text().trim()
        json['author'] = $('span.byline-name').text().trim()

        //TODO: rating is not working since the ratings are not loaded until the page is scrolled

        return json
    }).catch(err => {
        console.log('Error loading data: ' + err)
    })
}

function getTime($, tag) {
    const prep_amounts = clean($(tag).text()).split(' ')
    let dur = moment.duration(0)
    dur.add(parseInt(prep_amounts[0]), 'h')
    dur.add(parseInt(prep_amounts[2]), 'm')
    return dur.toISOString()
}
