import cheerio from "react-native-cheerio";
import {removeRepeatedWhitespace} from "./StringUtils";

async function getHTML(URL) {
    return await fetch(URL)
        .then(response => response.text())
}

async function getDOM(URL) {
    return getHTML(URL).then(html => cheerio.load(html))
}

function text(e) {
    try {
        return removeRepeatedWhitespace(e.text())
    } catch (e) {
        //the element contained no text
        return ""
    }
}

function genericScrape(dest, $, locations) {
    Object.keys(locations).forEach(key => {
        const location = locations[key];

        const e = $(location);
        if (Array.isArray(dest[key])) {
            e.each((i, e) => {
                dest[key].push(text($(e)))
            })
        } else {
            dest[key] = text(e)
        }

    })
}

export {getHTML, getDOM, text, genericScrape}
