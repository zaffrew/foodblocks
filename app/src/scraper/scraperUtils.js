import cheerio from "react-native-cheerio";
import {removeRepeatedWhitespace} from "../utils/StringUtils";
import moment from "moment";

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
        if (typeof location === 'object') {
            genericScrape(dest[key], $, location)
        } else {
            const e = $(location);
            if (Array.isArray(dest[key])) {
                e.each((i, e) => {
                    const res = text($(e));
                    if (res) {
                        dest[key].push(res)
                    }
                })
            } else {
                dest[key] = text(e)
            }
        }
    })
}

function getTime(timeStr, h, m) {
    const splits = timeStr.replace(/s/g, '') //if its hrs or mins then this removes the s
        .replace(h, m).split(m)
    const timeMoment = moment.duration({
        hours: timeStr.includes(h) ? splits[0].trim() : 0,
        minutes: splits[timeStr.includes(h) ? 1 : 0].trim()
    })
    return moment.duration(timeMoment).toISOString()
}

export {getHTML, getDOM, text, genericScrape, getTime}
