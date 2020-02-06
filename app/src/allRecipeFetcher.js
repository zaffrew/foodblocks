const cheerio = require('react-native-cheerio')

/**
 * This method requires the URL to direct to the print page of a allrecipe page.
 */
export default async function loadHTML(URL) {
    return await fetch(URL)
        .then(response => response.text())
        .then(html => cheerio.load(html))
        .then($ => {
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

            json['src'] = $('img.recipe-print__recipe-img').attr('src')

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

            console.log(json)
            return json
        })
        .catch(err => {
            console.log(err)
        })
}
