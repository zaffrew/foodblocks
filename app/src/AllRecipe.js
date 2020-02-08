const cheerio = require('react-native-cheerio')
const URL_PARSE = require('url-parse');

const ORIGIN = "https://www.allrecipes.com"

function getPrintURL(URL) {
    URL = new URL_PARSE(URL)
    if (!URL.pathname.endsWith('print')) {
        URL.set('pathname', URL.pathname + 'print/')
    }
    return URL.href
}

function getSearchURL(search) {
    search = encodeURIComponent(search)
    const URL = 'https://www.allrecipes.com/search/results/?wt=' + search
    return URL
}

/**
 * Returns the top URLs for the given search term on allrecipes.com
 */
export async function search(search, num) {
    const res = []
    return await getDOM(getSearchURL(search)).then($ => {
        $('h3.fixed-recipe-card__h3').each((i, e) => {
            if (i >= num) {
                return false
            }
            res.push($(e).children('a').attr('href'))
        })
        return res
    }).catch(err => {
        alert('Error searching: ' + err)
    })
}

async function getDOM(URL) {
    return await fetch(URL)
        .then(response => response.text())
        .then(html => cheerio.load(html))
}

export async function getData(URL) {
    URL = getPrintURL(URL)

    return await getDOM(URL).then($ => {
        const json = {URL}

        json['title'] = $('.recipe-print__title').text().trim()

        const directions = []
        $('.recipe-print__directions').children('.item').each((i, e) => {
            directions.push($(e).text().trim())
        })
        json['directions'] = directions

        const ingredients = [];
        $('.recipe-print__container2').children('ul').each((i, e) => {
            $(e).children('li').each((i, e) => {
                ingredients.push($(e).text().trim())
            })
        })
        json['ingredients'] = ingredients

        json['img'] = $('img.recipe-print__recipe-img').attr('src')

        $('li.prepTime__item').each((i, e) => {
            const timeElement = $(e).children('time')
            if (timeElement.length != 0) {
                const prepType = timeElement.attr('itemprop').trim()
                let prepTimeString = timeElement.attr('datetime').trim()
                prepTimeString = prepTimeString.replace('PT', '')
                let timeUnit = prepTimeString.charAt(prepTimeString.length - 1)

                json[prepType] = {time: prepTimeString.substring(0, prepTimeString.length - 1), timeUnit}
            }
        })

        return json
    }).catch(err => {
        alert('Error loading data: ' + err)
    })
}
